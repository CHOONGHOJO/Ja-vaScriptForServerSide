var express = require('express');
// file upload
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
    //   cb(null, file.originalname + '-' + uniqueSuffix)
    }
  })
var upload = multer({ storage: _storage })
var fs = require('fs');
var app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.locals.pretty = true;

//template directory, file 선언
app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/upload', function(req, res){
    res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
    console.log(req.file);
    res.send('Uploaded: '+req.file.filename);
});

//사용자요청을 적당한 controller와 연결해 주는 routing작업
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
  fs.readdir('data', function(err, files){
      if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
      }
    var id = req.params.id;
    if (id) {
      // id값이 있을 때
      fs.readFile('data/'+id, 'utf8', function(err, data){
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, title:id, description:data});
     })
    } else {
    //id값이  없을 때
      res.render('view', {topics:files, title:'Welcome', description:'Hello, Javascript for server'});
    }
  })
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
});

//application에게 특정 port를 listen하게 함
app.listen(3000, function(){
    console.log('Connected, 3000 port!!');
})
