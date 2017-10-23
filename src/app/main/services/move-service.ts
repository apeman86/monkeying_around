import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MoveEvent } from '../models/move-event';
import { WebsocketService } from './web-sockets-service';

@Injectable()
export class MoveEventService {

  moves: Subject<MoveEvent>;

  constructor(@Inject(WebsocketService) private wsService: WebsocketService) {
    this.moves = <Subject<MoveEvent>> wsService
    .connect()
    .map((response: MoveEvent): MoveEvent => {
      return response;
    });
  }

  sendMove(move: MoveEvent): void {
    this.moves.next(move);
  }
}
