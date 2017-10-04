import { BaseEngine } from "./base_engine";
import * as socket from 'socket.io';
import * as http from 'http';

export class DungeonEngine extends BaseEngine{
  public initialized = '';
  public clients = {};
  
  constructor(socket: socket) {
    super(socket);
    this.init(socket);
  }

  init(socket: socket): void {

    socket.on('connect', function(client){
      if(this.initialized != client.id) {
        
        client.cards = {1: 10,
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
        client.pulledCards = {};
        client.pile = [];
        client.getRandomInt = (min, max) => {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        };
        this.clients[client.id] = client;
        console.log('We are In', new Date());
        console.log('Socket Id: ', client.id);
        client.emit('welcome', 'Welcome In!');
        client.on('disconnect', function(){
          console.log('Socket Id: ', client.id);
          client.disconnect();
          delete this.clients[client.id];
        });
        this.initialized = client.id;
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
          this.pile.push(data);
          placed();
        });
        function passed(){
          client.emit('passed', {id: client.id, passed: true});
          client.broadcast.emit('passed', {id: client.id, passed: true});
        }
        function pulled(){
          var cardNum = client.getRandomInt(1, 10);
          console.log('Card Number: ', cardNum);
          client.pulledCards[cardNum] = client.cards[cardNum]; 
          client.emit('pulled', {id: client.id, card: client.cards[cardNum]});
          client.broadcast.emit('pulled', {id: client.id, card: client.cards[cardNum]});
        }
        function kept(){
          client.emit('kept', {id: client.id, kept: true});
          client.broadcast.emit('kept', {id: client.id, kept: true});
        }
        function placed(){
          client.emit('placed', {id: client.id, placed: true});
          client.broadcast.emit('placed', {id: client.id, placed: true});
        }
      }
    });
  }
  addUser(socket: socket): void {
    this.init(socket);
  }
}