const { exit } = require('process');
const { handler } = require('./index');

// Simula o evento Lambda
const event = {
  body: JSON.stringify({ cpf: '51313957811' }),
};

// Executa a função Lambda
handler(event).then((response) => {
  console.log('Resposta:', response);
  exit(1)
}).catch((error) => {
  console.error('Erro:', error);
  exit(1)
});
