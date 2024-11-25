// Importa o framework Express para criar o servidor e gerenciar as rotas.
import express from "express";

// Importa o Multer, uma biblioteca para upload de arquivos no Node.js.
import multer from "multer";

// Importa os controladores com as funções que gerenciam as operações nas rotas.
import {
  atualizaNovoPost,
  listarPosts,
  postarNovoPost,
  uploadImagem,
} from "../controllers/postsControllers.js";

// Importa o middleware CORS para permitir requisições de origens diferentes.
import cors from "cors";

// Configuração de CORS para permitir requisições da URL especificada.
const corsOptions = {
  origin: "http://localhost:8000", // Permite requisições apenas dessa origem.
  optionsSuccessStatus: 200, // Define o status de sucesso como 200.
};

// Configuração de armazenamento para uploads usando o Multer.
const storage = multer.diskStorage({
  // Define o diretório onde os arquivos serão armazenados.
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // A pasta 'uploads' é onde os arquivos serão salvos.
  },
  // Define o nome do arquivo salvo.
  filename: function (req, file, cb) {
    cb(null, file.originalname); // O arquivo manterá seu nome original.
  },
});

// Configura o Multer com as opções definidas, incluindo o caminho padrão para uploads.
const upload = multer({ dest: "./uploads", storage });

// Define as rotas e middleware para a aplicação.
const routes = (app) => {
  // Middleware para que o Express entenda requisições com formato JSON.
  app.use(express.json());

  // Middleware para habilitar CORS com as configurações definidas.
  app.use(cors(corsOptions));

  // Define a rota GET para '/posts', que lista todos os posts.
  // Quando essa rota é acessada, a função `listarPosts` é chamada para retornar os posts.
  app.get("/posts", listarPosts);

  // Define a rota POST para '/posts', que cria um novo post.
  // A função `postarNovoPost` é chamada quando essa rota é acessada.
  app.post("/posts", postarNovoPost);

  // Define a rota POST para '/upload', que faz o upload de uma imagem.
  // O middleware `upload.single("imagem")` processa o upload do arquivo enviado.
  // Após o upload, a função `uploadImagem` é chamada para manipular o arquivo e salvar as informações no banco.
  app.post("/upload", upload.single("imagem"), uploadImagem);

  // Define a rota PUT para '/upload/:id', que atualiza um post existente com base no ID fornecido na URL.
  // A função `atualizaNovoPost` é chamada para processar a atualização.
  app.put("/upload/:id", atualizaNovoPost);
};

// Exporta as rotas para serem usadas na aplicação principal.
export default routes;
