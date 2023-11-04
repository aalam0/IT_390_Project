//Server 
//Team 4 Mason Lost and Found
const express = require('express');
const form = express();
const port = 5505;

form.use(express.urlencoded({ extended: true }));

form.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

form.post('/submit', (req, res) => {
  const ItemID = req.body.ItemID;
  const Email = req.body.Email;
  const ItemName = req.body.ItemName;
  const ItemDesc = req.body.ItemDesc;
  const LocationFound = req.body.LocationFound; 
 

//DynamoDB 
  const dynamoDB = require('aws-sdk');

dynamoDB.config.update({
    region: 'us-east-1',  
    endpoint: "http://dynamodb.us-east-1.amazonaws.com",
    accessKeyId: 'AKIA27VQX6B2ZSPVRWUN',  
    secretAccessKey: '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' 
});

const docClient = new dynamoDB.DynamoDB.DocumentClient();

const input = {
    "ItemID": parseInt(ItemID),
    "Email": Email,
    "ItemName": ItemName,
    "ItemDesc": ItemDesc,
    "LocationFound": LocationFound,
    "Created": new Date().toString(),
    "Updated": new Date().toString(),
};

const params = {
    TableName: 'Items', 
    Item: input
};

docClient.put(params, (err, data) => {
    if (err) {
        console.error("Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("successful:", JSON.stringify(data, null, 2));
    }
});

  res.send('Your entry was successful!');
});

form.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


