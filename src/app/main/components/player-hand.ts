import { Component, Input } from '@angular/core';
import { PlayerHandContext } from '../models/player-hand-context';

@Component({
  selector: 'player-hand',
  templateUrl: '../app/main/templates/player-hand.html'
})
export class PlayerHand {
  @Input('playerHandContext')
  public playerHandContext: PlayerHandContext;
  constructor() {
  }

}
