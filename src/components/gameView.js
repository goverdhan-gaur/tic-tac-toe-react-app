import styles from './gameView.module.css'
function GameView(props) {
  return (
    <>
      <div className={styles.gameview}>{props.children}</div>
    </>
  )
}

export default GameView
