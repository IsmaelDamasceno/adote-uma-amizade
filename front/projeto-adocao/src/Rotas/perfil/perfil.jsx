import { useState, useEffect } from 'react';
import axios from "axios";
import styles from './perfil.module.css';
import { useNavigate } from "react-router-dom";
import { getUserId } from '../../Helpers/authHelper';

export function Perfil() {

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

	async function checarLogin() {
		const userId = getUserId();
		if (userId !== false) {
			const dadosResponse = await axios.get(`http://127.0.0.1:8000/api/pet-owners/${userId}/`, {
				headers: {
					"Authorization": `JWT ${localStorage.getItem("accessToken")}`
				}
			}).catch((error) => {
				navigate('/login');
			});

			if (dadosResponse.status === 200) {
				const data = dadosResponse.data;
				setDados({
					usuario: data.username,
					nome: data.first_name,
					sobrenome: data.last_name,
					email: data.email,
					endereco: data.address,
					telefone: data.phone_number
				});
				return;
			}
		}
		navigate('/login');
	}
	useEffect(() => { checarLogin() }, []);

	function deslogar() {
		localStorage.removeItem("accessToken");
		navigate("/login");
	}
	function deletarConta() {
		const dialog = document.getElementById("dialog");
		dialog.showModal();
	}
	function modalCancelar() {
		const dialog = document.getElementById("dialog");
		dialog.close();
	}
	async function modalConfirmar() {
		const userId = getUserId();
		if (userId !== false) {
			const dadosResponse = await axios.delete(`http://127.0.0.1:8000/api/pet-owners/${userId}/`, {
				headers: {
					"Authorization": `JWT ${localStorage.getItem("accessToken")}`
				}
			});
			localStorage.removeItem("accessToken");
			navigate("/login");
		}
	}

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.textCenter}>Olá <span className={styles.username}>{dados.usuario}</span>, seja bem-vindo(a) de volta!</h1>

				<button onClick={() => navigate("/meus-pets")} className={styles.button}>Meus Pets</button>

				<div className={styles.info}>
					<div className={styles.infoLeft}>
						<h2>Usuário: </h2>
						<h3 className={styles.dado}>{dados.usuario}</h3>

						<h2>Nome: </h2>
						<h3 className={styles.dado}>{dados.nome}</h3>

						<h2>Sobrenome: </h2>
						<h3 className={styles.dado}>{dados.sobrenome}</h3>
					</div>
					<div className={styles.infoRight}>
						<h2>Email: </h2>
						<h3 className={styles.dado}>{dados.email}</h3>

						<h2>Endereço: </h2>
						<h3 className={styles.dado}>{dados.endereco}</h3>

						<h2>Telefone: </h2>
						<h3 className={styles.dado}>{dados.telefone}</h3>
					</div>
				</div>

				<button onClick={() => navigate("/editar-perfil")} className={styles.button}>Editar Perfil</button>
				<button onClick={deslogar} className={styles.button}>Sair</button>
				<button onClick={deletarConta} className={styles.button}>Deletar conta</button>
			
				<dialog id='dialog' className={styles.confirmModal}>
					<div className={styles.modalHeader}>
						<h1>TEM CERTEZA?</h1>
						<h2>Sua conta NÃO poderá ser recuperada posteriromente</h2>
					</div>

					<div className={styles.modalBody}>
						<button onClick={modalConfirmar} className={styles.modalConfirmar}>Confirmar</button>
						<button onClick={modalCancelar} className={styles.modalCancelar}>Cancelar</button>
					</div>
				</dialog>
			</div>
		</>
	)
}

export default Perfil;