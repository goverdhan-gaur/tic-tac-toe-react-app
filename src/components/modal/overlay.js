import styles from './overlay.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
function Overlay(props) {
  return (
    <div className={props.className}>
      <div className={styles.modal}>
        {props.isDrawn === true && <h1>Match Draw</h1>}
        {props.whoWon === 1 && <h1>Player 1 Win</h1>}
        {props.whoWon === 2 && <h1>Player 2 Win</h1>}
        <div className="actions">
          <button onClick={props.refresh}>
            <FontAwesomeIcon icon={faRedoAlt} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Overlay
