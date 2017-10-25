import { BaseEngine } from './base_engine';
import * as socket from 'socket.io';
import * as http from 'http';
import { Card } from '../models/card';
import { Player } from '../models/player';
import { Deck } from '../models/deck';
import { MoveEvent } from '../models/move-event';

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

        client.on('disconnect', function(): void {
          client.disconnect();
          if(this.clients && this.clients[client.id]) {
            delete this.clients[client.id];
          }
        });
        this.initialized = client.id;
        client.on('move', (data) => {
          let move: MoveEvent = JSON.parse(data);
          if(move.type === 'pass') {
            if (this.myTurn(client.id)) {
              this.passed(client);
            } else {
              client.emit('move', {error: 'Not your turn', type:'turn'});
            }
          }
          if(move.type === 'pull') {
            if (this.myTurn(client.id)) {
              if (this.currentlyPulledCard == null ) {
                this.pulled(client);
              }
            } else {
              client.emit('move', {error: 'Not your turn', type:'turn'});
            }
          }
          if(move.type === 'keep') {
            if (this.myTurn(client.id)) {
              if (this.currentlyPulledCard != null ) {
                this.kept(client);
              }
            } else {
              client.emit('move', {error: 'Not your turn', type:'turn'});
            }
          }
          if(move.type === 'place') {
            if (this.myTurn(client.id)) {
              if (this.currentlyPulledCard != null ) {
                client.pile.push(data);
                this.placed(client);
              }
            } else {
              client.emit('move', {error: 'Not your turn', type:'turn'});
            }
          }
        });

        this.players.push(new Player(client.id, this.players.length));
        this.currentPlayerUid = this.players[this.currentPlayerIndex].getUid();
        client.broadcast.emit('move', {type: 'new_user', uid: client.id});
        client.emit('move', {uid: client.id, message:'Welcome In!', type: 'welcome', count: this.players.length});
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
    client.emit('move', {uid: client.id, card: this.currentlyPulledCard, type:'placed'});
    client.broadcast.emit('move', {uid: client.id, card: this.currentlyPulledCard , type:'placed'});
    this.currentlyPulledCard = null;
    this.progressTurn();
    this.clients[this.currentPlayerUid].emit('move', {message: 'Your Turn!', type:'turn'});
  }

  kept(client): void {
    client.emit('move', {uid: client.id, card: this.currentlyPulledCard, type:'kept'});
    client.broadcast.emit('move', {uid: client.id, card: this.currentlyPulledCard, type:'kept'});
    this.currentlyPulledCard = null;
    this.progressTurn();
    this.clients[this.currentPlayerUid].emit('move', {message: 'Your Turn!', type:'turn'});
  }

  pulled(client): void {
    console.log(client.deck);
    let card: Card = client.deck.pullCard();
    this.currentlyPulledCard = card;
    console.log(card);
    client.pulledCards.push(card);
    client.emit('move', {uid: client.id, card: card, type:'pulled'});
    client.broadcast.emit('move', {uid: client.id, card: card, type:'pulled'});
  }

  passed(client): void {
    client.emit('move', {uid: client.id, passed: true, type:'passed'} );
    client.broadcast.emit('move', {uid: client.id, passed: true, type:'passed'} );
  }
}
