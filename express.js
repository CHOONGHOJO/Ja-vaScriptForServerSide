
module.exports = function(){
    var express = require('express');
    var session = require('express-session');
    var MySQLStore = require('express-mysql-session')(session);
    var bodyParser = require('body-parser');
    
    var app = express();
    app.set('views', './views/mysql');
    app.set('view engine', 'jade');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
      secret: 'secret algorithm',
      resave: false,
      saveUninitialized: true,
      store:new MySQLStore({
        host:'localhost',
        port:3306,
        user:'root',
        password:'123456',
        database:'o2'
      })
    }));
    
    return  app;
}