
import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import styles from './navBar.module.css';
import { BsFillPersonFill } from "react-icons/bs"
import axios from 'axios'
import { checarLogin } from "../../Helpers/authHelper";

export default function NavBar(props) {

    const rotaLista = [
        {
            path: '/',
            name: 'Home',
        },
        {
            path: '/cadastro-pet',
            name: 'Cadastro Pet'
        }
    ]

    const [rotas, setRotas] = useState([]);
    const navigate = useNavigate();
    useEffect(render, []);

    function render(id = null) {
        let path = null;
        let name = null;
        if (id != null) {
            path = rotaLista[id].path;
            name = rotaLista[id].name;
        }
        else {
            path = rotaLista[0].path;
            name = rotaLista[0].name;
        }

        document.title = name;

        setRotas(rotaLista.map((obj, i) => (
            <Link onClick={() => { render(i) }} key={i} className={path === obj.path ? styles.active : styles.inactive} to={obj.path}>{obj.name}</Link>
        )));
    }

    async function logar() {
        if (await checarLogin() === true) {
            navigate("/perfil");
        }
        else {
            navigate("/login");
        }
    }

    return (
        <>
            <div className={styles.navbar}>
                <div>
                    {rotas}
                </div>
                <BsFillPersonFill className={styles.profile} onClick={logar} />
            </div>
            <Outlet />
        </>
    );
}
