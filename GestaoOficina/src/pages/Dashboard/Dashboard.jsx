import React from 'react'
import styles from './Dashboard.module.css'
import Button from '../../components/Button/Button'
import Agendamentos from '../../components/Agendamentos/Agendamentos'
import Calendario from '../../components/Calendario/Calendario'

const Dashboard = () => {
  return (
    <div className={styles.bodyContainer}>

      <div className={styles.centerBox}>

        <div className={styles.coluna1}>
          
          <div className={styles.agendamentos}>
            <Agendamentos/>
          </div>
          <div className={styles.calendario}>
            <Calendario></Calendario>
          </div>

        </div>

        <div className={styles.coluna2}>

          <div className={styles.buttons}>

            <Button text='Novo Serviço'/>
            <Button text='Novo Cliente'/>
            <Button text='Novo Produto'/>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard