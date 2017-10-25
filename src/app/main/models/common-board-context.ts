import { Card } from './card';

export class CommonBoardContext {
  public deck: Array<Card>;
  public pieces: Array<any>;
  public currentCharacter: Card;
  public characters: Array<Card>;
  constructor() {
    this.deck = [];
    this.pieces = [];
    this.characters = [];
  }
}