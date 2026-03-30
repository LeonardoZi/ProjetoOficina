import React from 'react'
import styles from './Button.module.css'

const Button = ({ text, path }) => {
  return (
    <button onClick={path} className={styles.button}>{text}</button>
  )
}

export default Button