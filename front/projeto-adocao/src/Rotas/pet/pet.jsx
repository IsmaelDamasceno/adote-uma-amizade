import { useState, useEffect } from "react";
import styles from './pet.module.css';
import axios from 'axios';
import { checarLogin } from "../../Helpers/authHelper";
import { useNavigate, useLocation } from 'react-router-dom';

export default function Pet() {

    const [dados, setDados] = useState({
        name: "",
        breed: "",
        age: "",
        color: "",
        size: "",
        description: "",
        gender: "",
        address: "",
        post_date: "",
        image: "",
        owner_name: "",
        owner_email: ""
    });
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const petId = searchParams.get('id');

    async function render() {


        const login = await checarLogin();
        if (login === true) {
            const response = await axios.get(`http://127.0.0.1:8000/api/pets/${petId}/`, {
                headers: {
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`
                }
            }).catch((error) => {
                console.error(error);
                navigate("/login");
            });

            if (response.status === 200 ) {
                console.log(response.data);

                const data = response.data;
                setDados({
                    name: data.name,
                    breed: data.breed,
                    age: data.age,
                    color: data.color,
                    size: data.size,
                    description: data.description,
                    gender: data.gender,
                    address: data.address,
                    post_date: data.post_date,
                    image: data.image,
                    owner_name: data.owner_name,
                    owner_email: data.owner_email
                });
            }
            else {
                console.log(response);
                navigate("/login");
            }
        }
        else {
            navigate("/login");
        }
    }
    useEffect(() => { render() }, [])

    return (
        <div className={styles.container}>
            <h1>{dados.name}</h1>
            <h2>{dados.post_date}</h2>

            <img className={styles.image} src={dados.image} />
            <h3>{dados.description}</h3>

            <h2>Informações: </h2>
            <div className={styles.info}>
                <div className={styles.infoLeft}>
                    <h2>Raça: </h2>
                    <h3 className={styles.dado}>{dados.breed}</h3>

                    <h2>Idade: </h2>
                    <h3 className={styles.dado}>{dados.age}</h3>

                    <h2>Cor: </h2>
                    <h3 className={styles.dado}>{dados.color}</h3>
                </div>
                <div className={styles.infoRight}>
                    <h2>Porte: </h2>
                    <h3 className={styles.dado}>{dados.size}</h3>

                    <h2>Endereço: </h2>
                    <h3 className={styles.dado}>{dados.address}</h3>

                    <h2>Dono: </h2>
                    <h3 className={styles.dado}>{dados.owner_name}</h3>
                </div>
            </div>

            <a className={styles.button} href={`mailto: ${dados.owner_email}`}>Contatar {dados.owner_email}</a>
        </div>
    );
}
