import React from 'react'
import styles from "./EventModal.module.css"
import moment from 'moment'

const EventModal = ({evento, onClose}) => {
  return (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <h2>{evento.title}</h2>
            <div className={styles.descContainer}>
                <p>{evento.desc}</p>
            </div>
            <span className={styles.dataChip}>Início: {moment(evento.start).format('DD/MM/YYYY, HH:mm')}</span>
            <span className={styles.dataChip}>Fim: {moment(evento.end).format('DD/MM/YYYY, HH:mm')}</span>
            <div className={styles.buttonContainer}>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    </div>
  )
}

export default EventModal