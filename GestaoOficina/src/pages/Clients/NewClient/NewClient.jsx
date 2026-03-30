import React, { useState } from 'react'
import styles from './NewClient.module.css'

const NewClient = () => {

  const formatarTelefone = (valor) => {

    let onlyNumbers = valor.replace(/\D/g, '');
    onlyNumbers = onlyNumbers.slice(0, 11);

    if (onlyNumbers.length > 2) {
      return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2)}`;
    }

    return onlyNumbers;

  };

  const formatarEmail = (valor) => {
    let emailLimpo = valor.replace(/\s/g, '');

    return emailLimpo;
  };

  const formatarCpf = (valor) => {
    let cpf = valor.replace(/\D/g, '');

    cpf = cpf.slice(0, 11);

    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return cpf;
  };



  const [name, setName] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')

  const handleSubmit = (e) => {
    (e).preventDefault();

    const data = {
      nome: name,
      telefone: tel,
      email: email,
      cpf: cpf
    }

    fetch("https://projetooficina-la3z.onrender.com/clientes", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data)

    }).then(res => console.log(res))

    console.log("Cliente criado com sucesso", name, tel, email, cpf)
  }

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className='form-label'>Nome</label>
            <input onChange={(e) => setName(e.target.value)} value={name} className="form-control" type="text" />
          </div>

          <div className="mb-3">
            <label className='form-label'>Telefone</label>
            <input type="text" onChange={(e) => setTel(formatarTelefone(e.target.value))} value={tel} className='form-control' />
          </div>

          <div className="mb-3">
            <label className='form-label'>Email</label>
            <input type="email" onChange={(e) => setEmail(formatarEmail(e.target.value))} value={email} className='form-control' />
          </div>

          <div className="mb-3">
            <label className='form-label'>Cpf</label>
            <input type="text" onChange={(e) => setCpf(formatarCpf(e.target.value))} value={cpf} className='form-control' />
          </div>

          <button className="btn btn-primary" type='submit'>Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default NewClient