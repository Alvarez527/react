
import { Square } from './Square.jsx'



export const Winner = ({winner, restart}) => {


  return (
    <section className='winner'>
      <div className='text'>
        <h2>
          {
            winner === false 
            ? 'Es un empate'
            : 'Ganó:'
          }
        </h2>
        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>
        <footer>
          <button onClick={restart}>Reiniciar</button>
        </footer>
      </div>
    </section>
  )
}

