import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { MainApp } from './components/main-app';
import { PlayerHand } from './components/player-hand';
import { MoveEventService } from './services/move-service';
import { WebsocketService } from './services/web-sockets-service';
import { CommonBoard } from './components/common-board';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    MainApp,
    PlayerHand,
    CommonBoard
  ],
  providers: [ WebsocketService, MoveEventService ],
  bootstrap: [
    MainApp
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule { }
