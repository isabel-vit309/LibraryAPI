import express from "express";
import { AppDataSource } from "./data-source";
import { LivroController } from "./controller/LivroController";
import cors from "cors";

const app = express();
const livroController = new LivroController();

app.use(cors());
app.use(express.json());

// Rotas CRUD
app.post("/livros", (req, res) => livroController.criarLivro(req, res));
app.get("/livros", (req, res) => livroController.listarLivros(req, res));
app.get("/livros/:id", (req, res) =>
  livroController.buscarLivroPorId(req, res)
);
app.put("/livros/:id", (req, res) => livroController.atualizarLivro(req, res));
app.delete("/livros/:id", (req, res) => livroController.excluirLivro(req, res));

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Banco de dados conectado");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar ao banco:", error));
