import { BaseEngine } from './base_engine';
import * as socket from 'socket.io';
import * as http from 'http';
import { Card } from '../models/card';
import { Player } from '../models/player';
import { Deck } from '../models/deck';

export class DungeonEngine extends BaseEngine {

  public initialized = '';
  public clients = {};
  private deck: Deck = new Deck();
  private players: Array<Player> = [];
  private currentPlayerIndex = 0;
  private currentPlayerUid: string;
  private currentlyPulledCard: Card;

  constructor(socket: socket) {
    super(socket);
    this.deck.setDeckSize(12);
    this.buildDeck();
    this.init(socket);
  }

  init(socket: socket): void {

    socket.on('connect', (client): void => {
      if (this.initialized !== client.id) {
        client.deck = this.getDeck();
        client.pulledCards = [];
        client.pile = [];
        this.clients[client.id] = client;
        client.emit('welcome', 'Welcome In!');
        client.on('disconnect', function(): void {
          client.disconnect();
          delete this.clients[client.id];
        });
        this.initialized = client.id;
        client.on('pass', (data): void => {
          if (this.myTurn(client.id)) {
            this.passed(client);
          } else {
            client.emit('turn', {error: 'Not your turn'});
          }
        });
        client.on('pull', (data): void => {
          if (this.myTurn(client.id)) {
            if (this.currentlyPulledCard == null ) {
              this.pulled(client);
            }
          } else {
            client.emit('turn', {error: 'Not your turn'});
          }
        });
        client.on('keep', (data): void => {
          if (this.myTurn(client.id)) {
            if (this.currentlyPulledCard != null ) {
              this.kept(client);
            }
          } else {
            client.emit('turn', {error: 'Not your turn'});
          }
        });
        client.on('place', (data): void => {
          if (this.myTurn(client.id)) {
            if (this.currentlyPulledCard != null ) {
              client.pile.push(data);
              this.placed(client);
            }
          } else {
            client.emit('turn', {error: 'Not your turn'});
          }
        });

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
    for (let index = 0; index < this.deck.getDeckSize(); index++) {
      let card = new Card('Title ' + index, 'Value ' + index);
      this.deck.addCard(card);
    }
    this.deck.shuffleCards();
  }

  getDeck(): Deck {
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
    this.currentlyPulledCard = null;
    this.progressTurn();
    this.clients[this.currentPlayerUid].emit('turn', {message: 'Your Turn!'});
  }

  kept(client): void {
    client.emit('kept', {id: client.id, kept: true});
    client.broadcast.emit('kept', {id: client.id, kept: true});
    this.currentlyPulledCard = null;
    this.progressTurn();
    this.clients[this.currentPlayerUid].emit('turn', {message: 'Your Turn!'});
  }

  pulled(client): void {
    console.log(client.deck);
    let card: Card = client.deck.pullCard();
    this.currentlyPulledCard = card;
    console.log(card);
    client.pulledCards.push(card);
    client.emit('pulled', {id: client.id, card: card});
    client.broadcast.emit('pulled', {id: client.id, card: card});
  }

  passed(client): void {
    client.emit('passed', {id: client.id, passed: true});
    client.broadcast.emit('passed', {id: client.id, passed: true});
  }
}
