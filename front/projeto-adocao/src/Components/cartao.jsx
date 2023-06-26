
import styles from "./cartao.module.css";

export default function Cartao(props) {
    return (
        <div className={styles.postagem} onClick={props.onClick}>
            <img src={props.source} alt="Uma imagem do pet"/>
            <h3 className={styles.centro}>{props.titulo}</h3>
            <h4>{props.idade} anos de idade</h4>
            <h4>De {props.usuario}</h4>
            <h4>{props.data}</h4>
        </div>
    );
}
