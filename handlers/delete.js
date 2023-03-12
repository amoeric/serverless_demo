'use strict';
const AWS = require('aws-sdk');

module.exports.delete = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const toBeRemovedName = event.pathParameters.name;

  await dynamoDb
    .delete({
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
      Key: {
        name: toBeRemovedName,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `${toBeRemovedName} has been deleted.` })
  };
};