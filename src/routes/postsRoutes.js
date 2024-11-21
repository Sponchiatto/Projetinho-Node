import express from "express";
import { listarPosts } from "../controllers/postsControllers.js";

const routes = (app) => {
  // Permite que o Express entenda requisições com formato JSON.
  app.use(express.json());

  // Rota GET para a URL '/posts'. Quando essa rota é acessada, a função getTodosPosts é chamada
  // e os posts obtidos são enviados como resposta em formato JSON.
  app.get("/posts", listarPosts);
};

export default routes;
