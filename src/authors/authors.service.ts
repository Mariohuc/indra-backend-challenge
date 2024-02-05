import { inject, injectable } from "tsyringe";
import { IRepository } from "src/common/database";
import { Author } from "./models";

@injectable()
export class AuthorsService {
  constructor(
    @inject("IRepository")
    private authorsRepository: IRepository<Author>
  ) {}
  async create(newAuthor: Author): Promise<Author> {
    return this.authorsRepository.create(newAuthor);
  }

  async getAll(): Promise<Author[]> {
    return this.authorsRepository.getAll();
  }
}

