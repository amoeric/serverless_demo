'use strict';
const AWS = require('aws-sdk');

module.exports.create = async (event, context, callback) => {
  console.log('event'+ JSON.parse(event.body))
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const body = JSON.parse(event.body);

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