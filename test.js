const { exit } = require('process');
const { handler } = require('./index.js');

// Simula o evento Lambda
const event = {
  cpf: '51313957801',
};

// Executa a função Lambda
handler(event).then((response) => {
  console.log('Resposta:', response);
  exit(1)
}).catch((error) => {
  console.error('Erro:', error);
  exit(1)
});
