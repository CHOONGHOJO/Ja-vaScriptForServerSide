var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
var upload = multer({ storage: _storage })
var fs = require('fs');
var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'o2'
});
conn.connect();
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));  
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.locals.pretty = true; // app.use(express.json()); // for parsing application/json
app.use('/user', express.static('uploads'));//template engine (express) directory, file 선언
app.set('views', './views_mysql');
app.set('view engine', 'jade');
app.get('/upload', function(req, res){
    res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
    res.send('Uploaded: '+req.file.filename);
});
app.get('/topic/new', function(req, res){
    fs.readdir('data', function(err, files){
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files});
    });
});
app.get(['/topic', '/topic/:id'], function(req, res){
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    var id = req.params.id;
    if (id) {
      var sql = 'SELECT * FROM topic WHERE ID=?';
      conn.query(sql, [id], function(err, topic, fields){
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.render('view', {topics:topics, topic:topic[0]});
        }
      });
    } else {
      res.render('view', {topics:topics});
    }
  });
});
app.post('/topic', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+ title, description, function(err){
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    });
})
app.listen(3000, function(){
    console.log('Connected, 3000 port!!');
})