const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "tastytap",
    ssl: {
        rejectUnauthorized: false
    }
};

function sanitizeCPF(cpf) {
    // console.log(cpf)
    return cpf.replace(/\D/g, '');
}

async function findBy(cpf) {
    const connection = await mysql.createConnection(dbConfig);

    try {
    const [rows] = await connection.execute(
        'SELECT * FROM user WHERE cpf = ?',
        [cpf]
      );

      return rows.length > 0;
    } catch(error) {
        console.log(error);
        return 0;
    } finally {
        connection.end();
    }
}

const secretKey = process.env.JWT_SECRET || "4c8895e1f38886e79ece6b115b91fa04becc27e344fb7275d7eabd8669e243c4";

exports.handler = async (event) => {
    console.log(event)
    let { cpf } = JSON.parse(JSON.stringify(event));
    cpf = sanitizeCPF(cpf)

    if (await findBy(cpf)) {

        try {
            const token = jwt.sign({ cpf }, secretKey, { expiresIn: 3600 });

            return {
                statusCode: 200,
                body: JSON.stringify({ token }),
            };
        } catch (error) {
            console.error('Erro:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Erro ao processar a solicitação' }),
            };
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'CPF não econtrado' }),
        };
    }
};
