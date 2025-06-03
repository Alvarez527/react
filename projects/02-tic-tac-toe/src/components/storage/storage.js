

import { TURNS } from '../../constants.js'



export const saveGame = ({newBoard, turn}) => {
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', turn)
}
export const loadGameBoard = () => {
    const boardFromStorage = window.localStorage.getItem('board')
    const board = boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)

    return board
}

export const loadGameTurn = () => {
    const turnFromStorage = window.localStorage.getItem('turn')
    console.log('turnFromStorage', turnFromStorage)
    return turnFromStorage ? turnFromStorage : TURNS.X
}


export const clearGame = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}
export const isGameSaved = () => {
    return window.localStorage.getItem('board') !== null
        && window.localStorage.getItem('turn') !== null
}