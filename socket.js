module.exports = function socket(io) {

  let stockList = [];

  io.on('connection', (socket) => {
    console.log('user has connected');
    socket.emit('addStocks', stockList);

    socket.on('requestStock', (stock) => {
      if (!stockList.includes(stock)) {
        stockList.push(stock);
        io.emit('addStock', stock);
      }
    });

    socket.on('removeStock', (stock) => {
      const index = stockList.indexOf(stock);
      if (index > -1 ) {
        stockList.splice(index, 1);
      }
      io.emit('removeStock', stock);
    });

    socket.on('disconnect', () => {
      console.log('user has disconnected');
    });

  });
}
