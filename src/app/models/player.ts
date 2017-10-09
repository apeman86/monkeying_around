export class Player {
  protected placeInOrder: number;
  protected userName: string;
  protected uid: string;
  constructor(uid: string, placeInOrder: number, userName?: string) {
    this.uid = uid;
    this.placeInOrder = placeInOrder;
    if (userName != null) {
      this.userName = userName;
    }
  }

  getUid(): string {
    return this.uid;
  }
}
