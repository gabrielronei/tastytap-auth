const { exit } = require('process');
const { handler } = require('./index.js');

// Simula o evento Lambda
const event = {
  cpf: '46586691028',
};

// Executa a função Lambda
handler(event).then((response) => {
  console.log('Resposta:', response);
  exit(1)
}).catch((error) => {
  console.error('Erro:', error);
  exit(1)
});
