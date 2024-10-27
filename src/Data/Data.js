import { useState } from 'react';
import { base } from '../firebase/airTableConfig';

function Data() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [resultado, setResultado] = useState('');

  const handleSalvar = () => {
    salvarResultado(nomeCompleto, resultado);
  };

  return (
    <div>
      <input
        type="text"
        value={nomeCompleto}
        onChange={(e) => setNomeCompleto(e.target.value)}
        placeholder="Nome Completo"
      />
      <input
        type="text"
        value={resultado}
        onChange={(e) => setResultado(e.target.value)}
        placeholder="Resultado"
      />
      <button onClick={handleSalvar}>Salvar</button>
    </div>
  );
}

export const salvarResultado = (nomeCompleto, resultado) => {
  base('Untitled App').create({
    'Nome': nomeCompleto,
    'Resultado': resultado
  }, function(err, record) {
    if (err) {
      console.error('Erro ao salvar resultado no Airtable:', err);
      return;
    }
    console.log('Resultado salvo com sucesso:', record.id);
  });
};

export default Data;
