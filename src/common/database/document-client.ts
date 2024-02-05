import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const documentClient = (): DocumentClient => {
  if (process.env.IS_OFFLINE || process.env.NODE_ENV == 'test') {
    return new AWS.DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://0.0.0.0:8000",
    });
  }
  return new AWS.DynamoDB.DocumentClient();
};

export default documentClient;
