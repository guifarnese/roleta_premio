// src/airtableConfig.js
import Airtable from 'airtable';

// Configura o Airtable com sua API Key
const base = new Airtable({ apiKey: 'patjB5YYugWVa3I4M.775787a1173e5dc6f8faa7a0c9c901332cd3b02163e7e1b3609cd65a9e576e7a' }).base('app7fIzN9a2F9ftAv');


export const salvarResultadoNoAirtable = (nomeCompleto, resultado) => {
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

export { base };


