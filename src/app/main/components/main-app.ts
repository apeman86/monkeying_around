import { Component, OnInit, Inject } from '@angular/core';
import { PlayerHandContext } from '../models/player-hand-context';
import { MoveEventService } from '../services/move-service';
import { MoveEvent } from '../models/move-event';
import { Subject } from 'rxjs';

@Component({
  selector: 'main-app',
  templateUrl: '../app/main/templates/main-app.html'
})
export class MainApp implements OnInit {

  public currentPlayerHandContext: PlayerHandContext;
  public otherPlayerHandContexts: Array<PlayerHandContext>;
  public numberOfPlayers: number;
  constructor(@Inject(MoveEventService) private moveService: MoveEventService) {
    this.currentPlayerHandContext = new PlayerHandContext();
    this.numberOfPlayers = 1;
  }

  ngOnInit(): void {
    this.moveService.moves.subscribe((move: MoveEvent) => {
      if('welcome' === move.type){
        console.log(move)
        this.currentPlayerHandContext.uid = move.uid;
        this.numberOfPlayers = move.count;
      }
      if('passed' === move.type){
        console.log(move);
      }
      if('pulled' === move.type){
        console.log(move);
        if(this.currentPlayerHandContext.uid === move.uid){
          this.currentPlayerHandContext.currentCardInHand = move.card;
        }
      }
      if('kept' === move.type){
        console.log(move);
      }
      if('placed' === move.type){
        console.log(move);
      }
      if('turn' === move.type){
        if (move.error) {
          console.log(move.error);
        } else {
          console.log(move.message);
        }
      }
      if('new_user' === move.type){
        console.log(move);
        this.numberOfPlayers++;
      }
    });
  }

  pass() {
    this.moveService.sendMove({uid: this.currentPlayerHandContext.uid, type:'pass'});
  }
  pull() {
    this.moveService.sendMove({uid: this.currentPlayerHandContext.uid, type:'pull'});
  }
  keep() {
    if(this.currentPlayerHandContext.currentCardInHand) {
      this.currentPlayerHandContext.keptCards.push(this.currentPlayerHandContext.currentCardInHand);
      this.moveService.sendMove({uid: this.currentPlayerHandContext.uid, type:'keep', card: this.currentPlayerHandContext.currentCardInHand});
      this.currentPlayerHandContext.currentCardInHand = null;
    }
  }
  place() {
    if(this.currentPlayerHandContext.currentCardInHand) {
      this.moveService.sendMove({uid: this.currentPlayerHandContext.uid, type:'place', card: this.currentPlayerHandContext.currentCardInHand});
      this.currentPlayerHandContext.currentCardInHand = null;
    }
  }

}
