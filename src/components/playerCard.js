import styles from './playerCard.module.css'
function PlayerCard(props) {
  console.log(`${props.player}: ${props.isWon} = ${props.playerId}`)
  return (
    <>
      <div className={styles.playercard + ' ' + props.className}>
        <h1 className={styles.heading_playercard}>{props.player}</h1>
        <div className={styles.player_moves_card}>
          {props.moves.map((move) => (
            <p className={styles.moves_item} key={Math.random() * 1}>
              {move}
            </p>
          ))}
          {props.isWon === props.playerId && (
            <div className={styles.winCard}>
              <h1>You won</h1>{' '}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PlayerCard
