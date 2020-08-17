'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-1"});



function dispatch(intentRequest, callback) {
    console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    const sessionAttributes = intentRequest.sessionAttributes;
   //const slots = intentRequest.currentIntent.slots;
    //const name = slots.fname;
    //const email = slots.email;
    
}

exports.handler = async (event, context,callback) =>{
     dispatch(event,
            (response) => {
                callback(null, response);
            });
    const ddb = new AWS.DynamoDB({ apiVersion: "2012=10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1"});

    var dateobj = new Date();
    var date = dateobj.toISOString();
    const params = {
        TableName: "Users",
        Item: {
            name:  "ABC XYZ",
            email: event.currentIntent.slots.email,
            feedback: null,
            receive: '0000-00-00 00:00:00',
            subscribe: date,
            unsubscribe: '0000-00-00 00:00:00',
            created: date,
            updated: date
        }
    }
    callback(close('Fulfilled',
    {'contentType': 'PlainText', 'content': `Hi, can You please provide me your email address`}));
    
    try {
      const data = await documentClient.put(params).promise();
      console.log(data);

    }catch(err){
        console.log(err);
    }
}

/*exports.handler = (event, context, callback) => {
    try {
       
    } catch (err) {
        callback(err);
    }
};*/
