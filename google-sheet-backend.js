// Get spreadsheet npm package
const { GoogleSpreadsheet } = require('google-spreadsheet');
// Ensure you've updated this file with your client secret
const clientSecret = require('./client_secret.json');

// Add your Google sheet ID here
const googleSheetID = '1pxo2JLQHgtppSsDBR9CrWTX6W5DpSYIULqJzTLKO_eo';

// Instantiates the spreadsheet
const sheet = new GoogleSpreadsheet(googleSheetID);
function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

function cleanData(data) {
	return {
		Email: data['email'],
		Name: data['name'],
		//website: data['Website']
	}
}

function dispatch(intentRequest, callback) {
    console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const name = slots.fname;
    const email = slots.email;
    getData(email);
    callback(close(sessionAttributes, 'Fulfilled',
    {'contentType': 'PlainText', 'content': `Hi, ${name},can You please provide me your email address ${email}`}));
    
}

async function getData(email) {
  try {
      // Authenticate using the JSON file we set up earlier
      await sheet.useServiceAccountAuth(clientSecret);
      await sheet.loadInfo();

      // Get the first tab's data
      const tab = sheet.sheetsByIndex[0];

      // Get row data
      
      const moreRows = await tab.addRows([
        { name: 'Sergey Brin', email: email },

      ]);
      /*const rows = await tab.getRows();
      // Empty array for our data
      let data = [];

      // If we have data
      if (rows.length > 0) {
          // Iterate through the array of rows
          // and push the clean data from your spreadsheet
          rows.forEach(row => {
            data.push(cleanData(row));
          });
      } else {
          return false;
      }*/

     // console.log(data);

      // Return the data JSON encoded
      return JSON.stringify(data);
  } catch(err) {
      console.log(err);
      return false;
  }
}

// Call the above method
/*exports.handler = async (event) => {
    const data = await getData();
    
    let response = {
        "statusCode": 200,
        "body": data,
        "isBase64Encoded": false
    };

    if (!data) {
        response = {
            "statusCode": 400,
            "body": 'Something went wrong',
            "isBase64Encoded": false
        };
    }

    return response;
}
*/
exports.handler = (event, context, callback) => {
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};
