import styles from './gameBoard.module.css'
function GameBoard(props) {
  let spotsLayout = []
  for (let spots of props.gameSpots) {
    for (let spot of spots) {
      spotsLayout.push(`${spot}`)
    }
  }

  return (
    <div className={styles.gameboard}>
      {spotsLayout.map((spot, index) => (
        <div
          className={styles.spot}
          key={index}
          id={index}
          onClick={props.onSpotClick}
        >
          <h1>{spot}</h1>
        </div>
      ))}
    </div>
  )
}

export default GameBoard
