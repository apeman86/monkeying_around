import * as express from 'express';
import * as socket from 'socket.io';
import * as http from 'http';
import * as config from 'config';
import { DungeonEngine } from './app/engines/dungeon_engine';

let port: number = process.env.PORT || config.get('port');
let app;
let io;
let server;

app = express();
server = http.createServer(app);
io = socket(server);
app.get('/', function(request, response): any {
  response.sendFile(__dirname + '/templates/index.html');
  if (server.engine == null) {
    server.engine = new DungeonEngine(io);
  } else {
    server.engine.addUser(io);
  }
});
server.listen(port);
