const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname + '/')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('PolyMe listening on port ' + port + '!');
});