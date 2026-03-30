import React from 'react'
import Dashboard from '../../pages/Dashboard/Dashboard'
import { Link } from 'react-router-dom'
import styles from "./Navbar.module.css"
import imagemLogo from '../../assets/LogoOficina.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navegar = useNavigate()

    return (
        <nav className={styles.navContainer + " navbar navbar-expand-lg"}>
            <div className="container-fluid">
                <Link to="/" className={styles.logo + " navbar-brand"}>
                    <img src={imagemLogo} alt="logo" />
                    <h1>MotorTech</h1>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    <span className="navbar-toggler-icon"></span>
</button>

                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <div className={styles.links + " navbar-nav mx-auto"}>
                        <a onClick={() => navegar('/')}><span>Dashboard</span></a>
                        <a href="#"><span>Estoque</span></a>
                        <a onClick={() => navegar('/clientes')}><span>Clientes</span></a>
                        <a href="#"><span>Ordens de Serviço</span></a>
                    </div>
                

                <div className={styles.loginSignup + " ms-auto"}>
                    Logado
                </div>
                </div>
            </div>

        </nav>
    )
}

export default Navbar