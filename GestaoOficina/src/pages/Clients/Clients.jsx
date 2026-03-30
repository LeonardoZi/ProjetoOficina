import { useState, useEffect } from 'react'
import styles from './Clients.module.css'

const Clients = () => {

    const [clientsList, setClientsList] = useState([]);

    useEffect(() => {
        fetch("https://projetooficina-la3z.onrender.com/clientes")
            .then(res => res.json())
            .then(clientsList => { setClientsList(clientsList) })
            .catch(err => console.error(err))
    }, [])

    return (
        <div className={styles.bodyContainer}>
            <div className={styles.centerContainer}>


                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Cpf</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientsList.map((cliente, index) => (

                            <tr key={cliente.id}>
                                <td>{index + 1}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.cpf}</td>
                                <td>Dropdownbutton</td>
                            </tr>

                        ))}

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Clients