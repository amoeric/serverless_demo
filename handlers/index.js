'use strict';
const AWS = require('aws-sdk');

module.exports.index = async (event) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
  };
 
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamoDb.scan(scanParams).promise();
 
  if (result.Count === 0) {
    return {
      statusCode: 404,
    };
  }
 
  return {
    statusCode: 200,
    body: JSON.stringify({
      total: result.Count,
      items: await result.Items.map((store) => {
        return {
	  name: store.primary_key,
          url: store.url,
        };
      }),
    }),
  };
};