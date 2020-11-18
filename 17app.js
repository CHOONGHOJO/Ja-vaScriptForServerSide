var express = require('express');
var app = express();

app.locals.pretty = true;

app.set('view engine', 'jade'); //express와 jade 연결
app.set('views', './views');

app.use(express.static('public'));

app.get('/form', function(req, res){
    res.render('form');
});

app.get('/form_receiver', function(req, res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title + ',' + description);
});

app.get('/topic/:id', function(req, res){
    var topics = [
        'Java is ...',
        'Nodejs is ...',
        'Express is ...'
    ];
    var output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2">Express</a><br><br>
    s{topics[req.params.id]}

    `
    res.send(output);
})

app.get('/topic/:id/:mode', function(req, res){
    res.send(req.params.id+','+req.params.mode)
})

app.get('/param/:module_id/:topic_id', function(req, res){
    res.json(req.params);
})

app.get('/template', function(req, res){
    res.render('temp', {time:Date(), _title:'Jade'});
});

app.get('/', function(req, res){        //get:routing, router 길을 찾는다라는 뜻
    res.send('Welcome home page!!');
}); 

app.get('/dynamic', function(req, res){
    var lis ='';
    for (var i=0; i < 5; i++){
        lis = lis + '<li>coding</li>';
    }
    var time=Date();  //Eastern Standard Time
    var output = `   
    <!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>Dynamic</title>
</head>
<body>
   Hello, Dynamic <br>
   <ul>
        ${lis}
    </ul>
    ${time}

</body>
</html>
    `
    res.send(output);
});

app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/route.png">');
});

app.get('/login', function(req, res){
    res.send('<h1>Login please...<h1>');
});

app.listen(3000, function(){
    console.log('Connected 3000 port!');
});
