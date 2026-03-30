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
                                <td className={styles.tdBtn}>
                                    <div className={styles.btnContainer}>
                                        <button className='btn btn-warning'><i class="bi bi-pencil-square"></i></button>
                                        <button className='btn btn-danger'><i class="bi bi-trash3"></i></button>
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            <li><button className='dropdown-item'>Ver veículos</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>

                        ))}

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Clients