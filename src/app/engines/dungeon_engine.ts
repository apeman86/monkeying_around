import { BaseEngine } from './base_engine';
import * as socket from 'socket.io';
import * as http from 'http';
import { Card } from '../models/card';
import { Player } from '../models/player';

export class DungeonEngine extends BaseEngine {

  public initialized = '';
  public clients = {};
  private deck: Array<Card> = [];
  private players: Array<Player> = [];
  private currentPlayerIndex = 0;
  private currentPlayerUid: string;

  constructor(socket: socket) {
    super(socket);
    this.buildDeck();
    this.init(socket);
  }

  init(socket: socket): void {

    socket.on('connect', (client): void => {
      if (this.initialized !== client.id) {
        console.log('Deck: ', this.deck);
        client.cards = this.getDeck();
        client.pulledCards = [];
        client.pile = [];
        client.getRandomInt = (min, max): number => {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        };
        this.clients[client.id] = client;
        console.log('We are In', new Date());
        console.log('Socket Id: ', client.id);
        client.emit('welcome', 'Welcome In!');
        client.on('disconnect', function(): void {
          console.log('Socket Id: ', client.id);
          client.disconnect();
          delete this.clients[client.id];
        });
        this.initialized = client.id;
        client.on('pass', (data): void => {
          if (this.myTurn(client.id)) {
            passed();
          } else {
            client.emit('turn', {error: 'Not your turn'});
          }
        });
        client.on('pull', (data): void => {
          if (this.myTurn(client.id)) {
            pulled();
          } else {
            client.emit('turn', {error: 'Not your turn'});
          }
        });
        client.on('keep', (data): void => {
          if (this.myTurn(client.id)) {
            this.kept(client);
          } else {
            client.emit('turn', {error: 'Not your turn'});
          }
        });
        client.on('place', (data): void => {
          if (this.myTurn(client.id)) {
            client.pile.push(data);
            this.placed(client);
          } else {
            client.emit('turn', {error: 'Not your turn'});
          }
        });
        function passed(): void {
          client.emit('passed', {id: client.id, passed: true});
          client.broadcast.emit('passed', {id: client.id, passed: true});
        }
        function pulled(): void {
          let cardNum = client.getRandomInt(1, 10);
          console.log('Card Number: ', cardNum);
          client.pulledCards.push(client.cards[cardNum]);
          client.emit('pulled', {id: client.id, card: client.cards[cardNum]});
          client.broadcast.emit('pulled', {id: client.id, card: client.cards[cardNum]});
        }
        
        this.players.push(new Player(client.id, this.players.length));
        this.currentPlayerUid = this.players[this.currentPlayerIndex].getUid();
      }
    });
  }
  addUser(socket: socket): void {
    this.init(socket);
    console.log('User Added!');
  }

  buildDeck(): void {
    for (let index = 0; index < 15; index++) {
      let card = new Card('Title ' + index, 'Value ' + index);
      this.deck.push(card);
    }
  }

  getDeck(): Array<Card> {
    return this.deck;
  }

  myTurn(uid: string): boolean {
    return uid === this.currentPlayerUid;
  }

  progressTurn(): void {
    if (this.currentPlayerIndex + 1 === this.players.length) {
      this.currentPlayerIndex = 0;
    } else {
      this.currentPlayerIndex++;
    }
    console.log('Current Player Index: ', this.currentPlayerIndex);
    this.currentPlayerUid = this.players[this.currentPlayerIndex].getUid();
  }

  placed(client): void {
    client.emit('placed', {id: client.id, placed: true});
    client.broadcast.emit('placed', {id: client.id, placed: true});
    this.progressTurn();
    this.clients[this.currentPlayerUid].emit('turn', {message: 'Your Turn!'});
  }

  kept(client): void {
    client.emit('kept', {id: client.id, kept: true});
    client.broadcast.emit('kept', {id: client.id, kept: true});
    this.progressTurn();
    this.clients[this.currentPlayerUid].emit('turn', {message: 'Your Turn!'});
  }
}
