import { Fragment, useState, useEffect, useRef } from 'react'
import './App.css'
import GameBoard from './components/gameBoard'
import GameView from './components/gameView'
import Modal from './components/modal'
import PlayerCard from './components/playerCard'

function App() {
  const [player, setPlayer] = useState(1)
  const [moveCount, setMoveCount] = useState(0)
  const [whoWon, setWhoWon] = useState(0)
  const [isDrawn, setIsDrawn] = useState(false)
  const winningPairs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const [gameSpots, setGameSpots] = useState([
    ['', '', ''], // 0,1,2
    ['', '', ''], // 3,4,5
    ['', '', ''], // 6,7,8
  ])

  let playerOneMoves = useRef([])
  let playerTwoMoves = useRef([])
  let playerOneArray = useRef([])
  let playerTwoArray = useRef([])

  const resetGame = () => {
    setGameSpots([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ])
    setPlayer(1)
    setMoveCount(0)
    setWhoWon(0)
    setIsDrawn(false)
    playerOneMoves.current = []
    playerTwoMoves.current = []
    playerOneArray.current = []
    playerTwoArray.current = []
  }
  const checkWinner = (winningPairs, currentAcquriedSpots) => {
    let count = 0
    winningPairs.forEach((pair) => {
      count = 0
      pair.forEach((spot) => {
        currentAcquriedSpots.current.includes(spot) && count++
      })
      if (count === 3) {
        setWhoWon(player)
        console.log('Won')
      } else {
        playerToggle()
      }
    })
    whoWon !== 0 && setMoveCount(9)
    if (moveCount === 8 && whoWon === 0) {
      setIsDrawn(true)
    }
  }

  const handleChange = (row, column, id) => {
    let tempArr = [...gameSpots]
    if (tempArr[row][column] === '') {
      if (moveCount < 9) {
        if (player === 1) {
          tempArr[row][column] = 'o'
          playerOneArray.current.push(+id)
          playerOneMoves.current.push(`Row: ${row + 1}, Column: ${column + 1}`)
          checkWinner(winningPairs, playerOneArray)
          setGameSpots(tempArr)
          setMoveCount(moveCount + 1)
        } else {
          tempArr[row][column] = 'x'
          playerTwoArray.current.push(+id)
          playerTwoMoves.current.push(`Row: ${row + 1}, Column: ${column + 1}`)
          checkWinner(winningPairs, playerTwoArray)
          setGameSpots(tempArr)
          setMoveCount(moveCount + 1)
        }
      }
    }
  }

  const playerToggle = () => {
    player === 1 ? setPlayer(2) : setPlayer(1)
  }

  const clickHandler = (e) => {
    if (whoWon === 0) {
      switch (e.target.id) {
        default:
          break
        case '0':
          handleChange(0, 0, e.target.id)
          break
        case '1':
          handleChange(0, 1, e.target.id)
          break
        case '2':
          handleChange(0, 2, e.target.id)
          break
        case '3':
          handleChange(1, 0, e.target.id)
          break
        case '4':
          handleChange(1, 1, e.target.id)
          break
        case '5':
          handleChange(1, 2, e.target.id)
          break
        case '6':
          handleChange(2, 0, e.target.id)
          break
        case '7':
          handleChange(2, 1, e.target.id)
          break
        case '8':
          handleChange(2, 2, e.target.id)
          break
      }
    }
  }

  return (
    <Fragment>
      <GameView>
        <h1 className="main_heading">Tic-Tac-Toe</h1>
        <PlayerCard
          player="Player 1"
          moves={playerOneMoves.current}
          isWon={whoWon}
          playerId={1}
          className="playercard_one"
          refresh={resetGame}
        />
        <GameBoard gameSpots={gameSpots} onSpotClick={clickHandler} />
        <PlayerCard
          player="Player 2"
          moves={playerTwoMoves.current}
          isWon={whoWon}
          playerId={2}
          className="playercard_two"
          refresh={resetGame}
        />
      </GameView>
      <Modal whoWon={whoWon} refresh={resetGame} isDrawn={isDrawn} />
    </Fragment>
  )
}

export default App
