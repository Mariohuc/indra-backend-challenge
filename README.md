# Indra Backend Challenge

## Interviewee Notes

According to the specs:
- A REST API was built to perform the GET and POST operations on the `authors` resource. 
  - Authors resource is identified by the URI `/authors`.
- The API is integrated with a Dynamo database (the author resources are stored there)
- The API is integrated with two endpoints of SWAPI:
  - GET https://swapi.py4e.com/api/people/
  - GET https://swapi.py4e.com/api/people/{id}
- A REST API can perform two GET operations on the people `resources` that correspond to the two endpoints of SWAPI seen previously.
  - People resource is identified by the URI  `/people`
  - This API is in charge of translating the people models retrieved from SWAPI
- The Serveless framework and Node.js were used to develop the API
- About the tests, there are unit and e2e tests. The e2e tests were performed using serverless-offline and serveless-dynamodb plugins to be able to emulate AWS Lamda, AWS DynamoDB and API Gateway locally and thus speed up the testing cycle.
  - **SuperTest**, and **Jest** were used to run the tests.
  - To run the unit tests, use the command `yarn test`
  - To run the e2e tests, use the command `yarn test:e2e`
  - It requires the application is running in order to have the database active
- Other scripts have been defined to run certain repetitive tasks
  - To start the application and AWS Lambda and DynamoDB locally, use the command `yarn start`

## Final notes

Below are all the endpoints deployed through AWS Lamda and API Gateway:
  - GET - https://1j034l2rlf.execute-api.us-east-1.amazonaws.com/production/people
  - GET - https://1j034l2rlf.execute-api.us-east-1.amazonaws.com/production/people/{personId}
  - GET - https://1j034l2rlf.execute-api.us-east-1.amazonaws.com/production/authors
  - POST - https://1j034l2rlf.execute-api.us-east-1.amazonaws.com/production/authors

Please replace `{personId}` with any number

Finally to test the POST `/authors` endpoint, you can use this example:
```
curl -d '{"firstName":"Lester","lastName":"Rico", "email":"ler@example.com"}' -H 'Content-Type: application/json' https://1j034l2rlf.execute-api.us-east-1.amazonaws.com/production/authors
```

That's it, thanks.