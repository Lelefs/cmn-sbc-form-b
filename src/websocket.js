const socketio = require('socket.io');

let io;
const connections = [];

exports.setupWebsocket = server => {
  io = socketio(server);

  io.on('connection', socket => {
    connections.push({
      id: socket.id,
    });
  });
};

exports.sendMessage = (message, data) => {
  connections.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
