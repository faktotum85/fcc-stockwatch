module.exports = function socket(io) {
  io.on('connection', (socket) => {
    console.log('user has connected');

    // echo any incoming message;
    socket.on('message', (message) => {
      io.emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('user has disconnected');
    });

  });
}
