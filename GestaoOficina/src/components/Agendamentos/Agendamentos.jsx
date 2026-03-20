import React from 'react'
import styles from './Agendamentos.module.css'

const Agendamentos = () => {

  const agendamentosLista = [
    { id: 1, cliente: "João Marcio dos Santos", os: "1", servico: "Troca de óleo", data: "12/03", hora: "14:00" },
    { id: 2, cliente: "Maria Betânia", os: "2", servico: "Revisão completa", data: "12/03", hora: "16:00" },
    { id: 3, cliente: "Roger Banana", os: "3", servico: "Motor aquecendo", data: "13/03", hora: "9:00" },
    { id: 4, cliente: "Roger Banana", os: "3", servico: "Motor aquecendo", data: "13/03", hora: "9:00" }
  ]

  return (
    <div className={styles.container}>

      <h2 className={styles.titulo}>Próximos Agendamentos</h2>

      <div className={styles.lista}>
        {agendamentosLista.map((agendamento) => (
          <div key={agendamento.id} className={styles.cardAgendamento}>
            <h3>{agendamento.cliente}</h3>
            <p>OS: {agendamento.os}</p>
            <p>Serviço: {agendamento.servico}</p>
            <p>Data agendada: {agendamento.data} {agendamento.hora}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Agendamentos