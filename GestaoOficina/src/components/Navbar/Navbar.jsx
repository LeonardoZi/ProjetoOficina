import React from 'react'
import Dashboard from '../../pages/Dashboard/Dashboard'
import { Link } from 'react-router-dom'
import styles from "./Navbar.module.css"
import imagemLogo from '../../assets/LogoOficina.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navegar = useNavigate()

    return (
        <nav className={styles.navContainer}>
            <Link to="/" className={styles.logo}>
                <img src={imagemLogo} alt="logo" />
                <h1>MotorTech</h1>
            </Link>

            <div className={styles.links}>
                <a onClick={() => navegar('/')}><span>Dashboard</span></a>
                <a href="#"><span>Estoque</span></a>
                <a onClick={() => navegar('/clientes')}><span>Clientes</span></a>
                <a href="#"><span>Ordens de Serviço</span></a>
            </div>

            <div className={styles.loginSignup}>
                Logado
            </div>

        </nav>
    )
}

export default Navbar