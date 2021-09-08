import { Fragment, useState, useEffect, useRef } from 'react'
import './App.css'
import GameBoard from './components/gameBoard'
import GameView from './components/gameView'
import PlayerCard from './components/playerCard'

function App() {
  const [player, setPlayer] = useState(1)
  const [moveCount, setMoveCount] = useState(0)
  const [whoWon, setWhoWon] = useState(0)
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

  const checkWinner = (winningPairs, currentAcquriedSpots) => {
    let count = 0
    winningPairs.map((pair) => {
      pair.forEach((spot) => {
        currentAcquriedSpots.current.includes(spot) && count++
      })

      if (count === 3) {
        setWhoWon(player)
        console.log(whoWon)
        setMoveCount(9)
      } else {
        playerToggle()
      }
      count = 0
    })
  }

  const handleChange = (row, column, id) => {
    let tempArr = [...gameSpots]
    if (tempArr[row][column] === '') {
      if (player === 1) {
        tempArr[row][column] = 'o'
        playerOneArray.current.push(+id)
        playerOneMoves.current.push(`Row: ${row + 1}, Column: ${column + 1}`)
        checkWinner(winningPairs, playerOneArray)
        setGameSpots(tempArr)
      } else {
        tempArr[row][column] = 'x'
        playerTwoArray.current.push(+id)
        playerTwoMoves.current.push(`Row: ${row + 1}, Column: ${column + 1}`)
        checkWinner(winningPairs, playerTwoArray)
        setGameSpots(tempArr)
      }
    }

    // console.log(gameSpots)
    // console.log(playerOneArray)
    // console.log(playerTwoArray)
  }

  const playerToggle = () => {
    player === 1 ? setPlayer(2) : setPlayer(1)
  }

  const clickHandler = (e) => {
    // console.log(e.target.id, typeof e.target.id)
    setMoveCount(moveCount + 1)
    if (moveCount < 9) {
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
        />
        <GameBoard gameSpots={gameSpots} onSpotClick={clickHandler} />
        <PlayerCard
          player="Player 2"
          moves={playerTwoMoves.current}
          isWon={whoWon}
          playerId={2}
          className="playercard_two"
        />
      </GameView>
    </Fragment>
  )
}

export default App
