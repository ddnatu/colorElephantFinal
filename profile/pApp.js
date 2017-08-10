const express = require('express')
const app = express();
var bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var path = require('path');
app.use(express.static('public'))

var __dirname = 'public';


app.get('/', function (req, res) {
  res.sendFile('public/profile.html');
});

 









app.listen(9000, function () {
  console.log('Example app listening on port 9000!')
})
