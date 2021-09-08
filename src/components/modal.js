import React from 'react'
import styles from './modal.module.css'
import Backdrop from './modal/backdrop'
import Overlay from './modal/overlay'
function Modal(props) {
  return (
    <React.Fragment>
      {props.isDrawn && (
        <>
          <Backdrop className={styles.backdrop} />
          <Overlay
            className={styles.overlay}
            result={props.whoWon}
            isDrawn={props.isDrawn}
            refresh={props.refresh}
          />
        </>
      )}
    </React.Fragment>
  )
}

export default Modal
