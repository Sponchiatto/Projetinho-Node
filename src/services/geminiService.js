// Importa o cliente para a API do Google Generative AI, que permite interagir com modelos generativos como o Gemini.
import { GoogleGenerativeAI } from "@google/generative-ai";

// Cria uma instância do cliente do Google Generative AI, passando a chave da API armazenada na variável de ambiente `GEMINI_API_KEY`.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo generativo específico chamado "gemini-1.5-flash", que será usado para processar os dados.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função assíncrona que recebe um buffer de imagem e gera uma descrição textual utilizando o modelo generativo.
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Define o prompt que será usado para guiar o modelo na geração da descrição.
  const prompt =
    "Gere uma descrição em português do Brasil para a seguinte imagem";

  try {
    // Cria um objeto que representa a imagem, convertendo o buffer da imagem para base64
    // e especificando o tipo MIME como 'image/png'.
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"), // Converte a imagem para base64.
        mimeType: "image/png", // Define o tipo da imagem como PNG.
      },
    };

    // Chama o modelo generativo com o prompt e os dados da imagem para gerar conteúdo.
    const res = await model.generateContent([prompt, image]);

    // Retorna o texto gerado pelo modelo. Se não houver resposta, retorna um texto padrão.
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    // Em caso de erro, exibe uma mensagem detalhada no console com informações do erro.
    console.error("Erro ao obter alt-text:", erro.message, erro);

    // Lança uma nova exceção para indicar que houve um problema ao gerar o texto alternativo.
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}
