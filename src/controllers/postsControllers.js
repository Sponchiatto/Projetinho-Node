// Importa funções relacionadas aos posts do modelo 'postsModel'.
import {
  atualizarPost,
  criarPost,
  getTodosPosts,
} from "../models/postsModel.js";

// Importa o módulo 'fs' para manipulação de arquivos.
import fs from "fs";

// Importa a função para gerar descrições de imagens usando o serviço Gemini.
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função para listar todos os posts existentes.
export async function listarPosts(req, res) {
  // Chama a função para buscar todos os posts do banco de dados.
  const posts = await getTodosPosts();
  // Envia uma resposta HTTP com status 200 (sucesso) e o array de posts.
  res.status(200).json(posts);
}

// Função para criar um novo post no banco de dados.
export async function postarNovoPost(req, res) {
  const novoPost = req.body; // Obtém o corpo da requisição, que contém os dados do novo post.

  try {
    // Tenta criar o post no banco de dados usando a função 'criarPost'.
    const postCriado = await criarPost(novoPost);
    // Retorna o post criado com status 200 (sucesso).
    res.status(200).json(postCriado);
  } catch (erro) {
    // Em caso de erro, loga a mensagem de erro no console.
    console.error(erro.message);
    // Retorna uma resposta com status 500 (erro interno do servidor) e uma mensagem de erro.
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

// Função para fazer upload de uma imagem e associá-la a um post.
export async function uploadImagem(req, res) {
  const novoPost = req.body; // Obtém os dados do novo post do corpo da requisição.

  try {
    // Cria o post no banco de dados.
    const postCriado = await criarPost(novoPost);

    // Define o caminho para salvar a imagem com o ID do post criado.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

    // Renomeia o arquivo temporário enviado para o caminho definido.
    fs.renameSync(req.file.path, imagemAtualizada);

    // Retorna o post criado com status 200 (sucesso).
    res.status(200).json(postCriado);
  } catch (erro) {
    // Loga a mensagem de erro no console em caso de falha.
    console.error(erro.message);
    // Retorna uma resposta com status 500 (erro interno do servidor) e uma mensagem de erro.
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

// Função para atualizar os dados de um post, incluindo a descrição gerada para uma imagem.
export async function atualizaNovoPost(req, res) {
  const id = req.params.id; // Obtém o ID do post a ser atualizado dos parâmetros da URL.
  const urlImagem = `http://localhost:3000/${id}.png`; // Define a URL pública da imagem associada ao post.

  try {
    // Lê o arquivo de imagem associado ao post a partir do diretório de uploads.
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);

    // Gera uma descrição para a imagem usando o serviço Gemini.
    const descricao = await gerarDescricaoComGemini(imageBuffer);

    // Monta o objeto de dados atualizado para o post.
    const post = {
      imgUrl: urlImagem, // URL da imagem.
      descricao: descricao, // Descrição gerada automaticamente.
      alt: req.body.alt, // Texto alternativo fornecido pelo cliente.
    };

    // Atualiza o post no banco de dados com os novos dados.
    const postCriado = await atualizarPost(id, post);

    // Retorna o post atualizado com status 200 (sucesso).
    res.status(200).json(postCriado);
  } catch (erro) {
    // Loga a mensagem de erro no console em caso de falha.
    console.error(erro.message);
    // Retorna uma resposta com status 500 (erro interno do servidor) e uma mensagem de erro.
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
