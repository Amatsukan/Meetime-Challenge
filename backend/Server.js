var app = require('http')
var express = require('express');
var cors = require('cors')
var app = express()

var bodyParser = require('body-parser')
const port = process.env.PORT || 4000

var router = require('./routes/Router.js');
//app.use(cors)
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.json());
app.use('/api', router);
app.listen(port)
console.log('API server started on: ' + port); 