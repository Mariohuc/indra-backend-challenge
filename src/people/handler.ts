import "reflect-metadata";
import { APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@common/utils";
import { PeopleService } from "./people.service";
import { container } from "./container";
import { AppError } from "@common";

export const getAllPeople = middyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    try {
      const page = event.queryStringParameters?.page;
      const peopleService = container.resolve(PeopleService);
      const people = await peopleService.getAll({ page });
      return {
        statusCode: 200,
        body: JSON.stringify(people, null, 2),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error, null, 2),
      };
    }
  }
);

export const getPersonById = middyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    try {
      const personId = event.pathParameters.personId;
      const peopleService = container.resolve(PeopleService);
      const person = await peopleService.getById(personId);
      return {
        statusCode: 200,
        body: JSON.stringify(person, null, 2),
      };
    } catch (e) {
      return {
        statusCode: e instanceof AppError ? e.statusCode : 500,
        body: JSON.stringify({
          message: e instanceof AppError ? e.message : "Unexpected error happened"
         }, null, 2),
      };
    }
  }
);
