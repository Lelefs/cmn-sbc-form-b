const http = require('http');
const app = require('./src/app');
const { setupWebsocket } = require('./src/websocket');
require('dotenv/config');

const server = http.Server(app);
setupWebsocket(server);

const apiPort = process.env.PORT || 3333;

server.listen(apiPort, function () {
  console.log(`🚀️ Backend is running on port ${apiPort}!`);
});
