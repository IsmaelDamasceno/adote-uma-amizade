
import styles from './login.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {

    const [ loginInfo, setLoginInfo ] = useState({
        nome: "",
        senha: ""
    });
    const navigate = useNavigate();

    async function logar() {
        const { nome, senha } = loginInfo;
        const response = await axios.post("http://127.0.0.1:8000/api/login/", {
            "username": nome,
            "password": senha
        });

        localStorage.setItem("accessToken", response.data.access);
        navigate("/perfil");
    }
    function handleChange(event){
        const {name, value } = event.target
        setLoginInfo({...loginInfo, [name]: value});
    }

    return (
        <div className={styles.container}>
            <div className={styles.cadastro}>
                <h1 className={styles.textCenter}>Entre na sua conta</h1>

                <h3>Nome: </h3>
                <input className={styles.input} name="nome" type="text" value={loginInfo.nome} onChange={handleChange}/>

                <h3>Senha: </h3>
                <input className={styles.input} name="senha" type="password" value={loginInfo.senha} onChange={handleChange}/>

                <Link className={styles.link} to="/cadastro">Não possuo conta</Link>
                <button className={styles.button} onClick={logar}>Entrar</button>
            </div>
        </div>
    );
}
