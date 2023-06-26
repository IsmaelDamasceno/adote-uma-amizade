import { useState } from 'react';
import axios from "axios";
import styles from './editpet.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserId } from '../../Helpers/authHelper';

export default function EditarPet() {
	const [dados, setDados] = useState({
		name: "",
		breed: "",
		age: "",
		color: "",
		size: "",
		gender: ""
	});
	function AtualizaInput(event) {
		const { name, value } = event.target
		setDados({ ...dados, [name]: value });
	}

	const navigate = useNavigate();

	const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const petId = searchParams.get('id');

	async function SalvarDados() {
		let putDados = {}
		Object.keys(dados).forEach(key => {
			if (dados[key] !== "") {
				putDados[dadosLink[key]] = dados[key];
			}
		});

		const userId = getUserId();
		if (userId !== false) {
			await axios.put(`http://127.0.0.1:8000/api/pets/${petId}/`, putDados, {
				"headers": {
					"Authorization": `JWT ${localStorage.getItem("accessToken")}`
				}
			});
			navigate("/perfil");
		}
		else {
			navigate('/login');
		}
	}

	async function SalvarDados() {
		let putDados = {}
		Object.keys(dados).forEach(key => {
			if (dados[key] !== "") {
				putDados[key] = dados[key]
			}
		});

		const userId = getUserId();
		if (userId !== false) {
			await axios.put(`http://127.0.0.1:8000/api/pets/${petId}/`, putDados, {
				"headers": {
					"Authorization": `JWT ${localStorage.getItem("accessToken")}`
				}
			});
			navigate("/perfil");
		}
		else {
			navigate('/login');
		}
	}

	return (
		<>
		<div className={styles.container}>
			<button className={styles.button} onClick={() => navigate(`/pet?id=${petId}`)}>Visualizar</button>
			<div className={styles.cadastro}>
				<h1 className={styles.textCenter}>Editar Animal</h1>
				<h3>Nome:</h3>
				<input className={styles.input} type="text" name='name' onChange={AtualizaInput}/>
				
				<h3>Idade:</h3>
				<input className={styles.input} type="text" name='breed' onChange={AtualizaInput}/>
				
				<h3>Raça:</h3>
				<input className={styles.input} type="text" name='age' onChange={AtualizaInput}/>
				
				<h3>Cor:</h3>
				<input className={styles.input} type="text" name='color' onChange={AtualizaInput}/>
				
				<h3>Porte:</h3>
				<input className={styles.input} type="text" name='size' onChange={AtualizaInput}/>
				
				<h3>Sexo:</h3>
				<input className={styles.input} type="text" name='gender' onChange={AtualizaInput}/>

				<br/><br/>
				<button className={styles.button} onClick={SalvarDados}>Salvar alterações</button>
			</div>
		</div>
		</>
	)
}
