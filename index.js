var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var initialized = '';
var clients = {};
var cards = {1: 10,
  2: 9,
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4,
  8: 3,
  9: 2,
  10: 1,
};
var pulledCards = {};
var pile = [];
app.get('/', function(request, response){
  response.sendFile(__dirname + '/app/index.html');
  io.on('connect', function(client){
    if(initialized != client.id) {
      clients[client.id] = client;
      console.log('We are In', new Date());
      console.log('Socket Id: ', client.id);
      client.emit('welcome', 'Welcome In!');
      client.on('disconnect', function(){
        console.log('Socket Id: ', client.id);
        client.disconnect();
        delete clients[client.id];
      });
      initialized = client.id;
      client.on('pass', function(data){
        console.log(data);
        passed();
      });
      client.on('pull', function(data){
        console.log(data);
        pulled();
      });
      client.on('keep', function(data){
        console.log(data);
        kept();
      });
      client.on('place', function(data){
        console.log(data);
        pile.push(data);
        placed();
      });
      function passed(){
        client.emit('passed', true);
      }
      function pulled(){
        var cardNum = getRandomInt(1, 10);
        console.log('Card Number: ', cardNum);
        pulledCards[cardNum] = cards[cardNum]; 
        client.emit('pulled', cards[cardNum]);
      }
      function kept(){
        client.emit('kept', 1)
      }
      function placed(){
        client.emit('placed', 1)
      }
    }
  });
});
server.listen(9009);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}