import { inject, injectable } from "tsyringe";
import { IRepository } from "src/common/database";
import { Persona } from "./models";

@injectable()
export class PeopleService {
  constructor(
    @inject("IRepository")
    private peopleRepository: IRepository<Persona>
  ) {}

  async getAll(metadata: { page: number; limit?: number }): Promise<any> {
    return this.peopleRepository.getAll(metadata);
  }

  async getById(personId: string): Promise<any> {
    return this.peopleRepository.getById(personId);
  }
}
