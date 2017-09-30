import * as express from 'express';
import * as socket from 'socket.io';
import * as http from 'http';
import * as config from 'config';

  let port: number = process.env.PORT || config.get('port');
  let app;
  let io;
  let server;
  let initialized = '';
  let clients = {};
  let cards = {1: 10,
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
  let pulledCards = {};
  let pile = [];
    
    app = express();
    server = http.createServer(app);
    io = socket(server);
    app.get('/', function(request, response){
      response.sendFile(__dirname + '/templates/index.html');
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
    server.listen(port);
  
  let getRandomInt = (min, max): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  };
  