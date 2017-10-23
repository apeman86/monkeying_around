import { Card } from './card';

export class PlayerHandContext {
  public uid: string;
  public keptCards: Array<Card>;
  public pieces: Array<any>;
  public wins: number;
  public losses: number;
  public currentCardInHand: Card;
  constructor() {
    this.keptCards = [];
    this.pieces = [];
    this.wins = 0;
    this.losses = 0;
  }
}
