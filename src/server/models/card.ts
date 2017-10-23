
export class Card {
  private title: string;
  private value: string;
  private imageSrc: string;
  constructor(title: string, value: string, imageSrc?: string) {
    this.title = title;
    this.value = value;
    if (imageSrc != null) {
      this.imageSrc = imageSrc;
    }
  }
  getTitle(): string {
    return this.title;
  }
  getValue(): string {
    return this.value;
  }
  getImageSrc(): string {
    return this.imageSrc;
  }
}
