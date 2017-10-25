import { Component, Input } from '@angular/core';
import { CommonBoardContext } from '../models/common-board-context';

@Component({
  selector: 'common-board',
  templateUrl: '../app/main/templates/common-board.html'
})
export class CommonBoard {
  @Input('commonBoardContext')
  public commonBoardContext: CommonBoardContext;
  constructor() {
  }

}