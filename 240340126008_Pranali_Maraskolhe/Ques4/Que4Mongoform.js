var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var MongoClient = require('mongodb').MongoClient; 
var url = 'mongodb://127.0.0.1:27017/product';
//var url = 'mongodb://127.0.0.1:27017/product';
var db;

MongoClient.connect(url, function(err, client) { 
      if (err) return console.log(err) 
      console.log("connection successful")
      db = client.db('product');
});

app.get('/', function (req, res) {
     res.sendFile('Que4Mongo.html' , { root : __dirname});
});


app.post('/submit-data', function (req, res) {
     res.send(req.body.ProductId  + ' Submitted Successfully!');
	db.collection('Inventory').insertOne(req.body, function(err, result){   
          if (err) return console.log(err);
          console.log('saved to database');
  });
  
});

app.get('/GetDetails', function (req, res) {
   db.collection('Inventory').find().toArray((err, results) => {
     if (err) return console.log("Error while getting",err);
     res.send(results);  
   });
});

app.listen(1800,()=>{
    console.log("Server is running on http://localhost:1800")
})