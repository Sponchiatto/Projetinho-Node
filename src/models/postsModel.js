import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO.
// O resultado da conexão é armazenado na variável 'conexao'.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() {
  // Seleciona o banco de dados 'imersao-instabytes'.
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção 'posts' dentro do banco de dados.
  const colecao = db.collection("posts");
  // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna um array com os resultados.
  return colecao.find().toArray();
}

export async function criarPost(novoPost) {
  // Seleciona o banco de dados 'imersao-instabytes'.
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção 'posts' dentro do banco de dados.
  const colecao = db.collection("posts");
  // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna um array com os resultados.
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  // Seleciona o banco de dados 'imersao-instabytes'.
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção 'posts' dentro do banco de dados.
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna um array com os resultados.
  return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}
