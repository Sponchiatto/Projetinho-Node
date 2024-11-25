// Importa a configuração para variáveis de ambiente, permitindo o uso do arquivo .env.
import "dotenv/config";

// Importa a classe ObjectId do MongoDB para manipulação de IDs.
import { ObjectId } from "mongodb";

// Importa a função para conectar ao banco de dados, definida em outro módulo.
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente 'STRING_CONEXAO'.
// O resultado da conexão é armazenado na variável 'conexao'.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() {
  // Seleciona o banco de dados chamado 'imersao-instabytes'.
  const db = conexao.db("imersao-instabytes");

  // Seleciona a coleção 'posts' dentro do banco de dados.
  const colecao = db.collection("posts");

  // Busca todos os documentos na coleção 'posts' e os retorna como um array.
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados.
export async function criarPost(novoPost) {
  // Seleciona o banco de dados chamado 'imersao-instabytes'.
  const db = conexao.db("imersao-instabytes");

  // Seleciona a coleção 'posts' dentro do banco de dados.
  const colecao = db.collection("posts");

  // Insere um novo documento (post) na coleção e retorna o resultado da operação.
  return colecao.insertOne(novoPost);
}

// Função assíncrona para atualizar um post existente no banco de dados.
export async function atualizarPost(id, novoPost) {
  // Seleciona o banco de dados chamado 'imersao-instabytes'.
  const db = conexao.db("imersao-instabytes");

  // Seleciona a coleção 'posts' dentro do banco de dados.
  const colecao = db.collection("posts");

  // Converte o ID em string fornecido para um objeto ObjectId, necessário para a consulta no MongoDB.
  const objID = ObjectId.createFromHexString(id);

  // Atualiza um documento na coleção 'posts', buscando pelo ID e atualizando os campos fornecidos.
  return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}
