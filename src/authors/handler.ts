import "reflect-metadata";
import { APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { AuthorsService } from "./authors.service";
import { schema } from "./authors.schema";
import { ValidatedEventAPIGatewayProxyEvent, middyfy } from "@common/utils";
import { container } from "./container";

export const getAllAuthors = middyfy(
  async (): Promise<APIGatewayProxyResult> => {
    try {
      const authorsService = container.resolve(AuthorsService);
      const authors = await authorsService.getAll();
      return {
        statusCode: 200,
        body: JSON.stringify(authors, null, 2),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error, null, 2),
      };
    }
  }
);

export const createAuthor = middyfy((async (event) => {
  try {
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
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e, null, 2),
    };
  }
}) as ValidatedEventAPIGatewayProxyEvent<typeof schema>);
