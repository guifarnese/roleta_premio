import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { opcoesRoleta, imagensProdutos } from "../Produtos";
import style from './Roleta.module.css';
import { salvarResultado } from "../Data/Data"; // Importa a função salvarResultado

const Roleta: React.FC = () => {
  const [escolhaAtual, setEscolhaAtual] = useState<string | null>(null);
  const [estaGirando, setEstaGirando] = useState<boolean>(false);
  const [rotacao, setRotacao] = useState<number>(0);
  const [produtoSorteado, setProdutoSorteado] = useState<{ nome: string; imagem: string } | null>(null);
  const [nomeCompleto, setNomeCompleto] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o nome do usuário está presente no localStorage
    const nomeSalvo = localStorage.getItem('playerName');
    if (!nomeSalvo) {
      // Se o nome não estiver presente, redireciona para o formulário
      navigate('/formulario');
    } else {
      setNomeCompleto(nomeSalvo);
    }
  }, [navigate]);

  const rodaRoleta = () => {
    // Verifica se o nome do jogador atual já está no localStorage
    const nomeJogadorSalvo = localStorage.getItem('nomeJogador');
    if (nomeJogadorSalvo === nomeCompleto) {
      // Se o nome já estiver salvo, significa que a pessoa já jogou
      alert('Você já girou a roleta! ');
      return; // Sai da função
    }

    // Se o nome não estiver salvo, continua com a lógica da roleta
    setEstaGirando(true);
    const randomIndex = Math.floor(Math.random() * opcoesRoleta.length);
    const angulo = 360 / opcoesRoleta.length;
    const rotacaoFinal = 7200 + angulo * randomIndex;

    setRotacao(rotacaoFinal);

    setTimeout(() => {
      const produto = opcoesRoleta[randomIndex];
      setEscolhaAtual(produto);
      setProdutoSorteado({ nome: produto, imagem: imagensProdutos[produto] });
      setEstaGirando(false);
    }, 3000);
  };

  return (
    <div className={style.container}>
      <h1>Gire a roleta para ganhar seu brinde!</h1>
      <div
        className={style.roleta}
        style={{ transform: `rotate(${rotacao}deg)` }}
      >
        <div className={style.opcoes}>
          {opcoesRoleta.map((opcao, index) => (
            <div
              key={index}
              className={`${style.reparticao} ${index % 2 === 0 ? style['reparticao-cor1'] : style['reparticao-cor2']}`}
              style={{
                transform: `rotate(${(360 / opcoesRoleta.length) * index}deg)`
              }}
            >
              <div className={style.opcao__container}>
                <div className={style.opcao}>
                  <div className={style.texto}>
                    {opcao}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={rodaRoleta}
          className={style.botao}
          disabled={estaGirando}
        >
          {estaGirando ? "Girando..." : "Girar!"}
        </button>
      </div>
      {!estaGirando && escolhaAtual && (
        <div className={style.resultado}>
          {produtoSorteado && (
            <div className={style.produtoSorteado}>
              <img src={produtoSorteado.imagem} alt={produtoSorteado.nome} className={style.imagemProduto}/>
              <p>Você ganhou: {produtoSorteado.nome}!</p>
            </div>
          )}
        </div>
      )}
      {!estaGirando && escolhaAtual && <Confetti />}
    </div>
  );
};

export default Roleta;
