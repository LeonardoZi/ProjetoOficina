import React, { useState, useEffect } from 'react'
import styles from './Agendamentos.module.css'
import moment from 'moment'

const Agendamentos = () => {

  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    fetch("https://projetooficina-la3z.onrender.com/ordens")
      .then(res => res.json())
      .then(eventsList => {setEventsList(eventsList); console.log(eventsList)})
      .catch(err => console.error(err))
  }, []);

  return (
    <div className={styles.container}>

      <h2 className={styles.titulo}>Próximos Agendamentos</h2>

      <div className={styles.lista}>
        {eventsList.map((agendamento) => 
          agendamento && (
            <div key={agendamento.id} className={styles.cardAgendamento}>
              <div className={styles.linhaTopo}>
                <h3>{agendamento.cliente.nome}</h3>
                <p>Data agendada: {moment(agendamento.dataAgendada).format('DD/MM/YYYY, HH:mm')}</p>
              </div>          
              <p>OS: {agendamento.id}</p>
              <p>Veículo: {agendamento.veiculo.marca} {agendamento.veiculo.modelo}</p>
              <p>Serviço: {agendamento.reclamacao}</p>
            </div>
        ))}
      </div>

    </div>
  )
}

export default Agendamentos