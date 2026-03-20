import React from 'react'
import styles from "./EventModal.module.css"

const EventModal = ({evento, onClose}) => {
  return (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <h2>{evento.title}</h2>
            <div className={styles.descContainer}>
                <p>{evento.desc}</p>
            </div>
            <span className={styles.dataChip}>Início: {evento.start.toLocaleString()}</span>
            <span className={styles.dataChip}>Fim: {evento.end.toLocaleString()}</span>
            <div className={styles.buttonContainer}>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    </div>
  )
}

export default EventModal