import * as express from 'express';
import * as socket from 'socket.io';
import * as http from 'http';
import * as config from 'config';
import * as path from 'path';
import { DungeonEngine } from './engines/dungeon_engine';

let port: number = process.env.PORT || config.get('port');
let app;
let io;
let server;

app = express();
server = http.createServer(app);
io = socket(server);
app.get('/', function(request, response): any {
  response.sendFile('templates/index.html', {root: 'dist'});
  if (server.engine == null) {
    server.engine = new DungeonEngine(io);
  } else {
    server.engine.addUser(io);
  }
});
// static content
app.get(/\/(app|css|fonts|templates|images|js|server|ps-favicon.ico)\//, (req: express.Request, res: express.Response) => {
  let path = req.path;
  res.sendFile(path, { root: 'dist' });
});
server.listen(port, '0.0.0.0', 511, () => {
  console.log('Listening on port ' + port);
});
