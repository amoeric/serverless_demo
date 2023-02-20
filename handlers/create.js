'use strict';
const AWS = require('aws-sdk');

module.exports.create = async (event, context, callback) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const body = JSON.parse(Buffer.from(event.body, 'base64').toString());

  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      primary_key: body.name,
      url: body.url,
    },
  };
  await dynamoDb.put(putParams).promise();
 
  return {
    statusCode: 200,
    body: JSON.stringify(putParams)
  };
};