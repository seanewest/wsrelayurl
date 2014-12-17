var WebSocketServer = require('ws').Server
var websocket = require('websocket-stream')
var through = require('through')

var streams = {};

var wss = new WebSocketServer({port: 3000});
wss.on('connection', function(ws) {
  var wsstream = websocket(ws);
  var url = ws.upgradeReq.url;
  if (!streams[url]) {
    streams[url] = through();
  }
  wsstream.pipe(streams[url]).pipe(wsstream)
});
