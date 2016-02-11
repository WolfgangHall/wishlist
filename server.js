var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var expressHandlebars = require('express-handlebars');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
var PORT = process.env.NODE_ENV || 8080;
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set ('view engine', 'handlebars');

var connection = mysql.createConnection ({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'wishlist_db'
});

app.get('/', function (req, res){
  connection.query("SELECT * FROM wishlist_table", function(err, results){
    if (err) {
      throw err;
    }
    var data = {
      wishes: results
    }
    res.render('wishlist', data);
  });
});

app.post('/', function(req, res) {
  var mySQLQuery = "INSERT INTO wishlist_table (wish) VALUES ('" + req.body.wishdata + "')";

  connection.query(mySQLQuery, function(err) {
    if (err) {
      throw err
    }
    res.redirect('/');
  });
});

app.post('/update/:id', function(req, res){
  var mySQLQuery = "UPDATE wishlist_table SET wish=" + connection.escape(req.body.wishtext) + " WHERE id=" + req.params.id;
  console.log(mySQLQuery);
  connection.query(mySQLQuery, function(err) {
    if (err) {
      throw err
    }
    res.redirect('/');
  });
})

app.get('/delete/:id', function(req, res) {
  var mySQLQuery = "DELETE FROM wishlist_table WHERE id=" + req.params.id;

  connection.query(mySQLQuery, function(err) {
    if (err) {
      throw err
    }
    res.redirect('/');
  });
});

app.listen(PORT, function(){
  console.log("Listening at port %s", PORT);
});