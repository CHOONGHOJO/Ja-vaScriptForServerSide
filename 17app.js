var express = require('express');
var app = express();

app.locals.pretty = true;

app.set('view engine', 'jade'); //express와 jade 연결
app.set('views', './views');

app.use(express.static('public'));

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
