import styles from './home.module.css';
import Cartao from '../../Components/cartao';

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { checarLogin, getUserId } from '../../Helpers/authHelper.js';
import axios from "axios";

export default function Home() {

    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    async function renderizar() {
        const response = await axios.get("http://127.0.0.1:8000/api/pets/")
        .catch((error) => {
            console.error(error)
        });

        console.log(response.data);

        if (response.status === 200) {
            setPets(response.data.map((obj, id) => (
                <Cartao onClick={() => entrarPet(obj.id)} key={id} idade={obj.age} titulo={obj.name} source={obj.image} alt="Foto do dog" usuario={obj.owner_name} data={obj.post_date.split("-").reverse().join("/")}  />
            )));
        }
        else {
            navigate("/login");
        }
    }
    useEffect(() => { renderizar() }, []);

    async function entrarPet(id) {
        if (await checarLogin() === true) {
            navigate(`/pet?id=${id}`);
        }
        else {
            const modal = document.getElementById("login-dialog");
            modal.showModal();
        }
    }

    return (
        <div className={styles.container}>
            <dialog className={styles.loginModal} id='login-dialog'>
                <h1>Você precisa estar logado para visualizar um pet</h1>
                <h2>Por favor, faça login e tente novamente</h2>
                <button onClick={() => navigate("/login")} className={styles.modalOk}>Fazer Login</button>
            </dialog>

            { pets }
        </div>
    );
}
