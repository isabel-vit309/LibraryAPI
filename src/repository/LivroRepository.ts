import { AppDataSource } from "../data-source";
import { Livro } from "../entity/Livro";

export class LivroRepository {
  private livroRepository = AppDataSource.getRepository(Livro);

  async findAll(): Promise<Livro[]> {
    return await this.livroRepository.find();
  }

  async findById(id: number): Promise<Livro | null> {
    return await this.livroRepository.findOneBy({ id });
  }

  async create(livroData: Partial<Livro>): Promise<Livro> {
    const livro = this.livroRepository.create(livroData);
    return await this.livroRepository.save(livro);
  }

  async update(id: number, livroData: Partial<Livro>): Promise<Livro | null> {
    await this.livroRepository.update(id, livroData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.livroRepository.delete(id);
    return result.affected !== 0;
  }
}
