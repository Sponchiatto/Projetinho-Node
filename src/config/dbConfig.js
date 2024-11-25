// Importa o MongoClient do pacote mongodb para interagir com o banco de dados MongoDB.
import { MongoClient } from "mongodb";

// Exporta uma função assíncrona para conectar ao banco de dados.
// Essa função recebe uma string de conexão como parâmetro.
export default async function conectarAoBanco(stringConexao) {
  let mongoClient; // Declara uma variável para armazenar o cliente do MongoDB.

  try {
    // Cria uma nova instância do MongoClient com a string de conexão fornecida.
    mongoClient = new MongoClient(stringConexao);

    // Loga no console indicando que a conexão ao cluster do banco de dados está em andamento.
    console.log("Conectando ao cluster do banco de dados");

    // Tenta estabelecer a conexão com o MongoDB.
    await mongoClient.connect();

    // Se a conexão for bem-sucedida, loga no console.
    console.log("Conectado ao MongoDB Atlas com sucesso!");

    // Retorna a instância do cliente conectado.
    return mongoClient;
  } catch (erro) {
    // Em caso de erro na conexão, loga uma mensagem de erro no console.
    console.error("Falha na conexão com o banco!", erro);

    // Encerra o processo do Node.js, já que não é possível continuar sem a conexão.
    process.exit();
  }
}
