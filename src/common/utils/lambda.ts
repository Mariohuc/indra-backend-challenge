import {
  errorHandlerMiddleware,
  validateBodyMiddleware,
} from "@common/middlewares";
import middy from "@middy/core";

import middyJsonBodyParser from "@middy/http-json-body-parser";
import { ClassConstructor } from "class-transformer";

export const middyfy = (handler, dto?: ClassConstructor<any>) => {
  if (dto) {
    return middy()
      .use(middyJsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
      .use(validateBodyMiddleware(dto))
      .use(errorHandlerMiddleware())
      .handler(handler);
  }
  return middy()
    .use(middyJsonBodyParser())
    .use(errorHandlerMiddleware())
    .handler(handler);
};
