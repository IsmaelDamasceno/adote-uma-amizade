import { useState, useEffect } from 'react';
import axios from "axios";
import styles from './editarPerfil.module.css';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../../Helpers/authHelper';

export default function EditarPerfil() {

	const dadosLink = {
		usuario: 'username',
		nome: 'first_name',
		sobrenome: 'last_name',
		email: 'email',
		endereco: 'address',
		telefone: 'phone_number'
	}

	const [dados, setDados] = useState({
		usuario: "",
		nome: "",
		sobrenome: "",
		email: "",
		endereço: "",
		telefone: ""
	});
	const navigate = useNavigate();

	async function SalvarDados() {
		let putDados = {}
		Object.keys(dados).forEach(key => {
			if (dados[key] !== "") {
				putDados[dadosLink[key]] = dados[key];
			}
		});

		const userId = getUserId();
		if (userId !== false) {
			await axios.put(`http://127.0.0.1:8000/api/pet-owners/${userId}/`, putDados, {
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

	function AtualizaInput(event) {
		const { name, value } = event.target
		setDados({ ...dados, [name]: value });
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.cadastro}>
					<h1 className={styles.textCenter}>Editar Perfil</h1>

					<h3>Usuário:</h3>
					<input className={styles.input} type="text" name='usuario' onChange={AtualizaInput} />

					<h3>Nome:</h3>
					<input className={styles.input} type="text" name='nome' onChange={AtualizaInput} />

					<h3>Sobrenome:</h3>
					<input className={styles.input} type="text" name='sobrenome' onChange={AtualizaInput} />

					<h3>Email:</h3>
					<input className={styles.input} type="text" name='email' onChange={AtualizaInput} />

					<h3>Endereço:</h3>
					<input className={styles.input} type="text" name='endereco' onChange={AtualizaInput} />

					<h3>Telefone:</h3>
					<input className={styles.input} type="text" name='telefone' onChange={AtualizaInput} />
					<br /><br />
					<button className={styles.button} onClick={SalvarDados}>Salvar</button>
				</div>
			</div>
		</>
	)
}
