import { Request, Response } from "express";
import { LivroRepository } from "../repository/LivroRepository";

const livroRepository = new LivroRepository();

export class LivroController {
  async criarLivro(req: Request, res: Response) {
    try {
      const livro = await livroRepository.create(req.body);
      res.status(201).json(livro);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async listarLivros(req: Request, res: Response) {
    try {
      const livros = await livroRepository.findAll();
      res.json(livros);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarLivroPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const livro = await livroRepository.findById(id);
      if (livro) {
        res.json(livro);
      } else {
        res.status(404).json({ message: "Livro não encontrado" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async atualizarLivro(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const livroAtualizado = await livroRepository.update(id, req.body);
      if (livroAtualizado) {
        res.json(livroAtualizado);
      } else {
        res.status(404).json({ message: "Livro não encontrado" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async excluirLivro(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deletado = await livroRepository.delete(id);
      if (deletado) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Livro não encontrado" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
