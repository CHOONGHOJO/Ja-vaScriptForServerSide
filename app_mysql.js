var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));  
app.locals.pretty = true; // app.use(express.json()); // for parsing application/json
app.use('/user', express.static('uploads'));//template engine (express) directory, file 선언
app.set('views', './views/mysql');
app.set('view engine', 'jade');

var topic = require('./routes/mysql/topic')();
app.use('/topic', topic);

app.listen(3003, function(){
    console.log('Connected, 3003 port!!');
})