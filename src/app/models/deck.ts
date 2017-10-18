import { Card } from './card';

export class Deck {
  protected deckSize = 52;
  protected cards: Array<Card> = [];
  protected shuffledCards: Array<Card> = [];

  getDeckSize(): number {
    return this.deckSize;
  }

  setDeckSize(size: number): void {
    this.deckSize = size;
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }

  shuffleCards(): void {
    let deck: Array<Card> = this.cards.slice();
    let tempDeck: Array<Card> = [];
    while (deck.length > 0) {
      let index: number = this.getRandomInt(0, deck.length);
      tempDeck.push(deck[index]);
      deck.splice(index, 1);
    }
    this.shuffledCards = tempDeck;
  }

  pullCard(): Card {
    return this.shuffledCards.splice(this.getRandomInt(0, this.shuffledCards.length), 1)[0];
  }

  getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
