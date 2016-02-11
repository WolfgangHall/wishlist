var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var expressHandlebars = require('express-handlebars');
var app = express();

app.use(bodyParser,urlencoded({extended: false}));
var PORT = process.env.NODE_ENV || 3306;
app.engine('handlebars', expressHandlebars({defaultLayout: 'list'}));
app.set ('view engine', 'handlebars');

var connection = mysql.createConnection ({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'wishlist_db'
})
