'use strict';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : process.env.TABLE_NAME
}

async function Items(){
  try {
    const data = await docClient.scan(params).promise()
    return data
  } catch (err) {
    return err
  }
}

module.exports.index = async (event) => {
  try {
    const data = await Items()
    return { body: JSON.stringify(data) }
  } catch (err) {
    return { error: err }
  }
};
