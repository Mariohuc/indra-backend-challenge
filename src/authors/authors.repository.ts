import { inject, injectable } from "tsyringe";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { IRepository } from "src/common/database";
import { Author } from "./models";

@injectable()
export class AuthorsRepository implements IRepository<Author> {
  private Tablename: string = "Authors";
  constructor(
    @inject("DocumentClient")
    private documentClient: DocumentClient
  ) {}

  async getAll(): Promise<Author[]> {
    const authors = await this.documentClient
      .scan({
        TableName: this.Tablename,
      })
      .promise();
    return authors.Items as Author[];
  }

  getById(): Promise<Author> {
    throw new Error("Method not implemented.");
  }

  async create(newAuthor: Author): Promise<Author> {
    await this.documentClient
      .put({
        TableName: this.Tablename,
        Item: newAuthor,
      })
      .promise();
    return newAuthor as Author;
  }
}
