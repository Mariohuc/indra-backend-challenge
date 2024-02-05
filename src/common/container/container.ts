import { container } from "tsyringe";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import documentClient from "../database/document-client";

container.register<DocumentClient>("DocumentClient", {
  useValue: documentClient(),
});

export { container };
