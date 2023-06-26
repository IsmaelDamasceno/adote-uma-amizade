
import styles from './cadastro.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Cadastro() {

    const [ dados, setDados ] = useState({
        usuario: "",
        nome: "",
        sobrenome: "",
        email: "",
        endereco: "",
        telefone: "",
        senha: "",
        confirmarSenha: ""
    });
    const navigate = useNavigate();

    function handleChange(event){
        const {name, value } = event.target
        setDados({...dados, [name]: value});
    }

    async function cadastrar() {
        let abort = false;
        Object.keys(dados).forEach(key => {
            if (abort) {
                return;
            }
            if (dados[key] === "") {
                alert(`O campo ${key} deve ser preenchido`);
                abort = true;
            }
        });
        if (abort) {
            return;
        }

        if (dados.senha !== dados.confirmarSenha) {
            console.error("Senhas não batem");
            alert("Senhas não batem");
            return;
        }

        const response = await axios.post("http://127.0.0.1:8000/api/pet-owners/", {
            username: dados.usuario,
            email: dados.email,
            phone_number: dados.telefone,
            address: dados.endereco,
            first_name: dados.nome,
            last_name: dados.sobrenome,
            password: dados.senha
        }).catch(error => {
            console.error(error);
        });

        if (response.status === 201) {
            const loginResponse = await axios.post("http://127.0.0.1:8000/api/login/", {
                username: dados.usuario,
                password: dados.senha
            }).catch((error) => {
                console.error(error);
            });

            if (loginResponse.status === 200) {
                localStorage.setItem("accessToken", loginResponse.data.access);
                navigate("/perfil");
            }
        }
        else {
            console.log(response);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.cadastro}>
                <h1 className={styles.textCenter}>Cadastre sua conta</h1>

                <h3>Usuário: </h3>
                <input className={styles.input} required type="text" name='usuario' onChange={handleChange}/>

                <h3>Nome: </h3>
                <input className={styles.input} required type="text" name='nome' onChange={handleChange}/>

                <h3>Sobrenome: </h3>
                <input className={styles.input} required type="text" name='sobrenome' onChange={handleChange}/>

                <h3>Email: </h3>
                <input className={styles.input} required type="email" name='email' onChange={handleChange}/>

                <h3>Endereço: </h3>
                <input className={styles.input} required type="text" name='endereco' onChange={handleChange}/>

                <h3>Telefone: </h3>
                <input className={styles.input} required type="text" name='telefone' onChange={handleChange}/>

                <h3>Senha: </h3>
                <input className={styles.input} required type="password" name='senha' onChange={handleChange}/>

                <h3>Confirmar senha: </h3>
                <input className={styles.input} required type="password" name='confirmarSenha' onChange={handleChange}/>

                <Link className={styles.link} to="/login">Já possuo conta</Link>
                <button onClick={cadastrar} className={styles.button}>Cadastrar</button>
            </div>
        </div>
    );
}
