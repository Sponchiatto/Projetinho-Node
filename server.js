import express from "express";

const posts = [
  {
    id: 1,
    descricao: "Uma bela paisagem",
    imagem: "https://picsum.photos/400/600",
  },
  {
    id: 2,
    descricao: "Um close-up interessante",
    imagem: "https://picsum.photos/200/200",
  },
  {
    id: 3,
    descricao: "Foto de um gato adorável",
    imagem: "https://picsum.photos/300/400",
  },
  {
    id: 4,
    descricao: "Um pôr do sol incrível",
    imagem: "https://picsum.photos/800/600",
  },
  {
    id: 5,
    descricao: "Uma obra de arte abstrata",
    imagem: "https://picsum.photos/500/500",
  },
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

function buscaPostPorID(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

app.get("/posts/:id", (req, res) => {
  const index = buscaPostPorID(req.params.id);
  res.status(200).json(posts[index]);
});
