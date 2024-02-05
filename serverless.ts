import type { AWS } from "@serverless/typescript";
import { createAuthor, getAllAuthors } from "src/authors";
import { getAllPeople, getPersonById } from "src/people";

const serverlessConfiguration: AWS = {
  service: "indra-code-challenge",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-dynamodb", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:BatchWriteItem"
            ],
            Resource: "arn:aws:dynamodb:us-east-1:*:table/Authors",
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { getAllPeople, getPersonById, getAllAuthors, createAuthor },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    dynamodb: {
      start: {
        docker: true,
        port: 8000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev",
    },
  },
  resources: {
    Resources: {
      Authors: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Authors",
          AttributeDefinitions: [
            {
              AttributeName: "authorId",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "authorId",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
