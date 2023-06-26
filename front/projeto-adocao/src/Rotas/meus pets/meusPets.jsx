import { useState, useEffect } from "react";
import Cartao from "../../Components/cartao";
import styles from './meusPets.module.css';
import { useNavigate } from 'react-router-dom';
import { getUserId, checarLogin } from '../../Helpers/authHelper.js';
import axios from "axios";

export default function MeusPets() {

    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    async function renderizar() {
        const userId = getUserId();
        if (userId !== false) {
            const response = await axios.get("http://127.0.0.1:8000/api/my-pets/", {
                "headers": {
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`
                }
            }).catch((error) => {
                console.error(error)
            });

            if (response.status === 200) {
                setPets(response.data.map((obj, id) => (
                    <Cartao onClick={() => entrarPet(obj.id)} key={id} idade={obj.age} titulo={obj.name} source={obj.image} alt="Foto do dog" usuario={obj.owner_name} data={obj.post_date.split("-").reverse().join("/")}  />
                )));
            }
            else {
                navigate("/login");
            }
        }
        else {
            navigate("/login");
        }
    }
    useEffect(() => { renderizar() }, []);

    async function entrarPet(id) {
        if (await checarLogin() === true) {
            navigate(`/editar-pet?id=${id}`);
        }
        else {
            const modal = document.getElementById("login-dialog");
            modal.showModal();
        }
    }

    return (
        <div className={styles.container}>
            <dialog id='login-dialog'>
                <h1>Você precisa estar logado</h1>
            </dialog>
            { pets }
        </div>
    );
}
