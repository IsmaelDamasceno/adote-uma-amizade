import { useState, useEffect } from 'react';
import styles from './cadastroPet.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { getUserId, checarLogin } from '../../Helpers/authHelper';
import axios from 'axios';

export default function CadastroPet() {

    const [dados, setDados] = useState({
        nome: "",
        raca: "",
        idade: "",
        cor: "",
        porte: "",
        descricao: "",
        genero: "",
        endereco: "",
        imagem: {}
    });
    const navigate = useNavigate();

    useEffect(() => {
        verificacao()
    }, []);

    async function verificacao() {
        if (await checarLogin() === false) {
            navigate("/login");
        }
    }

    function handleChange(event) {
        const { name, value } = event.target
        setDados({ ...dados, [name]: value });
    }
    function handleImageChange(event) {
        const image = event.target.files[0];
        setDados({ ...dados, imagem: image });
    }
    async function handleSubmit(event) {
        event.preventDefault();

        if (getUserId() !== false) {
            const response = await axios.postForm("http://127.0.0.1:8000/api/pets/", {
                name: dados.nome,
                breed: dados.raca,
                age: dados.idade,
                color: dados.cor,
                size: dados.porte,
                description: dados.descricao,
                gender: dados.genero,
                address: dados.endereco,
                image: dados.imagem
            }, {
                headers: {
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                }
            }).catch((error) => {
                console.error(error);
            });

            if (response.status === 201) {
                navigate("/perfil");
            }
            else {
                navigate("/login")
            }
        }
        else {
            navigate("/login");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.cadastro}>
                <form onSubmit={handleSubmit}>
                    <h1 className={styles.textCenter}>Cadastre seu pet</h1>

                    <h3>Nome: </h3>
                    <input className={styles.input} type="text" name='nome' onChange={handleChange} />

                    <h3>Raça: </h3>
                    <input className={styles.input} type="text" name='raca' onChange={handleChange} />

                    <h3>Idade: </h3>
                    <input className={styles.input} type="text" name='idade' onChange={handleChange} />

                    <h3>Cor: </h3>
                    <input className={styles.input} type="text" name='cor' onChange={handleChange} />

                    <h3>Porte: </h3>
                    <input className={styles.input} type="text" name='porte' onChange={handleChange} />

                    <h3>Descrição breve: </h3>
                    <input className={styles.input} type="text" name='descricao' onChange={handleChange} />

                    <h3>Gênero (Macho / Fêmea): </h3>
                    <input className={styles.input} type="text" name='genero' onChange={handleChange} />

                    <h3>Endereço: </h3>
                    <input className={styles.input} type="text" name='endereco' onChange={handleChange} />

                    <h3>Imagem: </h3>
                    <input className={styles.input} type="file" name='imagem' onChange={handleImageChange} />
                    
                    <input type='submit' className={styles.button} value="Cadastrar" />
                </form>
            </div>
        </div>
    );
}
