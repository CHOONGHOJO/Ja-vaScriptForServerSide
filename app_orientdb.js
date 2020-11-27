var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var upload = multer({ storage: _storage })

var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
var upload = multer({ storage: _storage })
fs = require('fs');
var OrientDB = require('orientjs');
const { values } = require('underscore');
var server = OrientDB ({
  host: "localhost",  
  port: 2424,
  username: 'root',
  password: 'M0000000'
});
var db = server.use('ssjs')  //web1
var app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.locals.pretty = true;

app.use('/user', express.static('uploads'));
//template directory, file 선언
app.set('views', './views_orientdb');
app.set('view engine', 'jade');

app.get('/upload', function(req, res){
    res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
    res.send('Uploaded: '+req.file.filename);
});

//사용자요청을 적당한 controller와 연결해 주는 routing작업
app.get('/topic/add', function(req, res){
    var sql = 'SELECT FROM topic';
    db.query(sql).then(function(topics){
        res.render('add', {topics:topics});
    });
});

app.post('/topic/add', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var sql = 'INSERT INTO topic (title, description, author) VALUES (:title, :desc, :author)';
    db.query(sql, {
        params: {
            title: title,
            desc: description,
            author: author
        }
    }).then(function(results){
        res.redirect('/topic/'+ encodeURIComponent(results[0]['@rid']));
    });
    
    fs.writeFile('data/'+ title, description, function(err){
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    });
});

app.get('/topic/:id/edit', function(req, res){
    var sql = 'SELECT FROM topic';
    var id = req.params.id;
    db.query(sql).then(function(topics){
        var sql = 'SELECT FROM topic WHERE  @rid=:rid';
        db.query(sql, {params:{rid:id}}).then(function(topic){
            res.render('edit', {topics:topics, topics: topic[0]});  
        });
    });
});

app.post('/topic/:id/add', function(req, res){
    var sql = 'UPDATE topic SET title=:t, description=:d, author=:a WHERE @rid=:rid' ;
    var id = req.params.id;
    var title = req.body.title;
    var desc = req.body.description;
    var author = req.body.author;
    db.query(sql. {
        params: {
            t:title,
            d:desc,
            a:author,
            rid:id
        }
    }).then(function(topics){
        res.redirect('/topic/'+encodeURIComponent(id));
    });
});

app.get('/topic/:id/delete', function(req, res){
    var sql = 'SELECT FROM topic';
    var id = req.params.id;
    db.query(sql).then(function(topics){
        var sql = 'SELECT FROM topic WHERE  @rid=:rid';
        db.query(sql, {params:{rid:id}}).then(function(topic){
            res.render('delete', {topics:topics, topics: topic[0]});  
        });
    });
});

app.post('/topic/:id/delete', function(req, res){
    var sql = 'DELETE VERTEX FROM topic  WHERE @rid=:rid' ;
    var id = req.params.id;
    db.query(sql. {
        params: {
            rid:id
        }
    }).then(function(topics){
        res.redirect('/topic/');
    });
});

app.get(['/topic', '/topic/:id'], function(req, res){
    var sql = 'SELECT FROM topic';
    db.query(sql).then(function(topics){
        var id = req.params.id;
        if (id) {
        var sql = 'SELECT FROM topic WHERE  @rid=:rid';
        db.query(sql, {params:{rid:id}}).then(function(topic){
            res.render('view', {topics:topics, topics: topic[0]});  
        });
        }  else {
            res.render('view', {topics:topics}); 
        }
    });
}); 

//application에게 특정 port를 listen하게 함
app.listen(3000, function(){
    console.log('Connected, 3000 port!!');
})
