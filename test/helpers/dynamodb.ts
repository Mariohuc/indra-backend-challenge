import * as AWS from "aws-sdk";

const docClient = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://0.0.0.0:8000",
});

export const getItem = async (params: {
  tableName: string;
  key: { [k: string]: any };
}) => {
  const data = await docClient
    .get({ TableName: params.tableName, Key: params.key })
    .promise();
  return data.Item;
};

// Save set of data
export const setData = async (dataSet: {
  tableName: string;
  items: any[];
}) => {
  const buildSetData = { RequestItems: {} };

  buildSetData.RequestItems[dataSet.tableName] = dataSet.items.map((Item) => ({
    PutRequest: { Item },
  }));

  await docClient.batchWrite(buildSetData).promise();
};

// Remove all data from database names
export const emptyTable = async (table: {
  tableName: string;
  hashKey: string[];
}) => {
  const data = await docClient
    .scan({
      TableName: table.tableName,
    })
    .promise();

  const buildDeleteData = {
    RequestItems: { [table.tableName]: [] as any[] },
  };
  if ((data as any).Items.length == 0) return;

  (data as any).Items.forEach((obj) => {
    const hashkeys = {};
    table.hashKey.forEach((key) => {
      hashkeys[key] = obj[key];
    });
    buildDeleteData.RequestItems[table.tableName].push({
      DeleteRequest: { Key: hashkeys },
    });
  });

  await docClient.batchWrite(buildDeleteData).promise();
};
