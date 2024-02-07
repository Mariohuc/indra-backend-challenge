import "reflect-metadata";
import { APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { AuthorsService } from "./authors.service";
import { middyfy } from "@common/utils";
import { container } from "./container";
import { CreateAuthorDto } from "./dto/create-author.dto";

export const getAllAuthors = middyfy(
  async (): Promise<APIGatewayProxyResult> => {
    const authorsService = container.resolve(AuthorsService);
    const authors = await authorsService.getAll();
    return {
      statusCode: 200,
      body: JSON.stringify(authors, null, 2),
    };
  }
);

export const createAuthor = middyfy(async (event) => {
  const id = v4();
  const authorsService = container.resolve(AuthorsService);
  const author = await authorsService.create({
    authorId: id,
    firstName: event.body.firstName,
    lastName: event.body.lastName,
    email: event.body.email,
    createdAt: new Date().toISOString(),
  });
  return {
    statusCode: 201,
    body: JSON.stringify(author, null, 2),
  };
}, CreateAuthorDto);
