import express from "express";
import multer from "multer";
import {
  atualizaNovoPost,
  listarPosts,
  postarNovoPost,
  uploadImagem,
} from "../controllers/postsControllers.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  // Permite que o Express entenda requisições com formato JSON.
  app.use(express.json());

  // Rota GET para a URL '/posts'. Quando essa rota é acessada, a função getTodosPosts é chamada
  // e os posts obtidos são enviados como resposta em formato JSON.
  app.get("/posts", listarPosts);

  // Rota para criar um post
  app.post("/posts", postarNovoPost);
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizaNovoPost);
};

export default routes;
