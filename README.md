
---

# 📸 Instabytes API
Uma API para gerenciar posts e gerar descrições automáticas para imagens utilizando o modelo generativo **Gemini** da Google Generative AI.

Esse projeto foi feito na imersão back-end da Alura, contribuindo para minha introdução na área.

## 🛠 Funcionalidades

- **Gerenciamento de posts**: Listar, criar e atualizar posts.
- **Upload de imagens**: Armazena imagens enviadas pelo cliente.
- **Geração de descrição de imagens**: Gera automaticamente descrições (alt-text) para as imagens utilizando inteligência artificial.
- **Armazenamento no MongoDB**: Dados dos posts e suas informações são armazenados no banco de dados.

---

## 🚀 Tecnologias Utilizadas

- **Backend**:
  - [Node.js](https://nodejs.org)
  - [Express](https://expressjs.com/)
  - [Multer](https://github.com/expressjs/multer) (para upload de arquivos)
- **Banco de Dados**:
  - [MongoDB](https://www.mongodb.com/)
- **Inteligência Artificial**:
  - [Google Generative AI](https://ai.google/tools/generative-ai/) com o modelo Gemini
- **Outros**:
  - [dotenv](https://github.com/motdotla/dotenv) (variáveis de ambiente)
  - [cors](https://github.com/expressjs/cors) (configuração de CORS)

---

## 🗂 Estrutura do Projeto

```
📂 instabytes-api
├── 📂 src
│   ├── 📂 config
│   │   └── dbConfig.js          # Configuração de conexão com o MongoDB
│   ├── 📂 controllers
│   │   └── postsControllers.js  # Lógica para gerenciamento de posts
│   ├── 📂 models
│   │   └── postsModel.js        # Modelos para interagir com o banco de dados
│   ├── 📂 routes
│   │   └── postsRoutes.js       # Rotas para o gerenciamento de posts e upload
│   ├── 📂 services
│   │   └── geminiService.js     # Integração com o modelo Gemini AI
├── 📂 uploads                   # Diretório para armazenar imagens enviadas
├── .env                         # Variáveis de ambiente
├── package.json                 # Dependências e scripts do projeto
└── server.js                    # Arquivo principal para rodar a aplicação
```

---

## 🧰 Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MongoDB Atlas](https://www.mongodb.com/atlas) ou uma instância local do MongoDB
- Conta no [Google Generative AI](https://ai.google/tools/generative-ai/) com acesso ao modelo **Gemini**

---

## 🚀 Como Rodar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/instabytes-api.git
   cd instabytes-api
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   STRING_CONEXAO=<sua-string-de-conexao-com-o-MongoDB>
   GEMINI_API_KEY=<sua-chave-de-API-do-Gemini>
   ```

4. **Inicie o servidor**:
   ```bash
   npm start
   ```
   O servidor estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 🛠 Endpoints Disponíveis

### **Gerenciamento de Posts**

| Método | Endpoint        | Descrição                           |
|--------|-----------------|-------------------------------------|
| GET    | `/posts`        | Lista todos os posts               |
| POST   | `/posts`        | Cria um novo post                  |
| PUT    | `/upload/:id`   | Atualiza post com alt-text gerado  |

### **Upload de Imagem**

| Método | Endpoint        | Descrição                           |
|--------|-----------------|-------------------------------------|
| POST   | `/upload`       | Faz upload de uma imagem           |

---

## 📖 Exemplo de Uso

### **Criar um Post**
**Requisição**:
```bash
POST /posts
Content-Type: application/json
{
  "titulo": "Meu Post",
  "conteudo": "Essa é uma descrição de exemplo."
}
```

**Resposta**:
```json
{
  "acknowledged": true,
  "insertedId": "64f70a09cf1c1b7ef8c12345"
}
```

### **Fazer Upload de Imagem**
**Requisição**:
```bash
POST /upload
Content-Type: multipart/form-data
{
  "imagem": <arquivo.png>
}
```

**Resposta**:
```json
{
  "acknowledged": true,
  "insertedId": "64f70a09cf1c1b7ef8c12345"
}
```

---

## 🔧 Melhorias Futuras

- Corrigir o deploy no google cloud

---

## 👨‍💻 Autor

Feito com ❤️ por **[Rafael Sponchiatto Silva](https://github.com/Sponchiatto)**.  
Sinta-se à vontade para contribuir, reportar problemas ou sugerir melhorias!

---
