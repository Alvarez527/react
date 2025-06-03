import './App.css'
import { useState } from 'react'
import confetti from "canvas-confetti"
import { Square } from './components/Square.jsx'
import { TURNS, WINNER_COMBOS } from './constants.js'
import { Winner } from './components/Winner.jsx'
import { useEffect } from 'react'
import { loadGameBoard, saveGame } from './components/storage/storage.js'
import { loadGameTurn } from './components/storage/storage.js'




function App() {

  const [board, setBoard] = useState( () => {
    return loadGameBoard()
  })

  const [turn, setTurn] = useState(() => {

    return loadGameTurn()
  })

  const [winner, setWinner] = useState(null)

  const checkWinner = (board) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return
    // if the square is already filled, do nothing
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
        // if there is a winner, set the winner
    if (checkWinner(newBoard)) {
      setWinner(turn)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      return
    }
    // Check if game is over
    if (newBoard.every(square => square !== null)) {
      setWinner(false) // it's a draw
      return
    }

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)


  }

  const restart = () => {     
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

useEffect(() => {
  console.log('useEffect')
  saveGame({ newBoard: board, turn: turn }) // Save the game state
}, [winner, board, turn])

  return (
   
    <main className='board'>
      <h1> Tic tac toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square 
                key={index} 
                index={index} 
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }

      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      {
        winner != null && (
          <Winner winner={winner} restart={restart}></Winner>
        )
      }
    </main>
  )
}

export default App
