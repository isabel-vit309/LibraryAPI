import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  autor!: string;

  @Column({ unique: true })
  isbn!: string;

  @Column({ name: "ano_publicacao" })
  anoPublicacao!: number;

  @Column({ default: true })
  disponivel!: boolean;
}
