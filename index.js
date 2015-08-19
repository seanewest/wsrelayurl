var websocket = require('websocket-stream')
var through = require('through')

module.exports = function(port) {
  var streams = {};

  var Server = websocket.Server;
  var server = new Server({port: port})

  server.on('connection', function(ws) {
    var wsstream = websocket(ws);
    var url = ws.upgradeReq.url;
    if (!streams[url]) {
      streams[url] = through();
    }
    wsstream.pipe(streams[url]).pipe(wsstream)
  });

  return server;
}
