// Importa o framework Express, que será usado para criar o servidor e gerenciar as rotas.
import express from "express";

// Importa as rotas definidas no arquivo postsRoutes.js, que contém as regras para lidar com as requisições HTTP.
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do Express, que é a base para criar o servidor.
const app = express();

// Define a pasta "uploads" como estática, permitindo o acesso direto a arquivos dessa pasta via URL.
// Isso é útil para servir imagens ou outros arquivos carregados pelo Multer.
app.use(express.static("uploads"));

// Chama as rotas definidas no arquivo de rotas e as associa à aplicação Express.
routes(app);

// Inicia o servidor na porta 3000.
// O método `listen` coloca o servidor em execução e exibe uma mensagem no console informando que o servidor está ativo.
app.listen(3000, () => {
  console.log("Server is running on port 3000"); // Mensagem exibida no console para indicar que o servidor está rodando.
});
