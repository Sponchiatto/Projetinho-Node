import { getTodosPosts } from "../models/postsModel.js";

export async function listarPosts(req, res) {
  // chama a função para buscar os posts
  const posts = await getTodosPosts();
  //Envia uma resposta HTTP com status 200 e os posts
  res.status(200).json(posts);
}
