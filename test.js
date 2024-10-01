const { exit } = require('process');
const { handler } = require('./index.js');

// Simula o evento Lambda
const event = {
  body: '{\n    "cpf": "32621927831"\n}',
};

// Executa a função Lambda
handler(event).then((response) => {
  console.log('Resposta:', response);
  exit(1)
}).catch((error) => {
  console.error('Erro:', error);
  exit(1)
});
