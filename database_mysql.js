var mysql      = require('mysql');
// const { values } = require('underscore');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'o2'
});
conn.connect();

// var sql = 'SELECT * FROM topic';
// conn.query(sql, function(err, rows, fields){
//     if(err){
//         console.log(err);
//     } else {
//         for (var i=0; i < rows.length; i++){
//             console.log(rows[i].description);
//         }
//     }
// });

// var sql = 'INSERT INTO topic (title, description, author) \
//  VALUES(?,?,?)';
// var params = ['Supervisor', 'Watcher', 'graphittie '];
// conn.query(sql, params, function(err, rows, fields){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(rows.insertId);
//         }
// });

// var sql = 'UPDATE topic SET title=?, author=? WHERE id=?';
// var params = ['Nodejsss', 'egoingss', 6];
// conn.query(sql, params, function(err, rows, fields){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(rows);
//     }
// });

var sql = 'DELETE FROM topic WHERE id=?';
var params = [6];
conn.query(sql, params, function(err, rows, fields){
    if(err){
        console.log(err);
    } else {
        console.log(rows);
    }
});
conn.end();

