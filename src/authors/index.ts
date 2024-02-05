import { handlerPath } from "@common/utils";
import { schema } from "./authors.schema";

export const getAllAuthors = {
  handler: `${handlerPath(__dirname)}/handler.getAllAuthors`,
  events: [
    {
      http: {
        method: "get",
        path: "authors",
      },
    },
  ],
};

export const createAuthor = {
  handler: `${handlerPath(__dirname)}/handler.createAuthor`,
  events: [
    {
      http: {
        method: "post",
        path: "authors",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
