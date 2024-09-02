import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Formulario.module.css';

const Formulario: React.FC = () => {
    const [nome, setNome] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (nome.trim() !== '') {
            // Salva o nome no localStorage
            localStorage.setItem('playerName', nome);

            // Redireciona para a roleta
            navigate('/roleta');
        } else {
            alert('Por favor, insira seu nome.');
        }
    };

    return (
        <section className={style.container}>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='Digite seu nome completo'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={style.input}
                />
                <button type='submit' className={style.button}>
                    Enviar
                </button>
            </form>
        </section>
    );
}

export default Formulario;