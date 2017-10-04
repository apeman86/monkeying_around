import * as socket from 'socket.io';
import * as http from 'http';

export class BaseEngine {
  protected io: socket;
  constructor(socket: socket){};
  init(socket: socket): void {};
}