var socket = io();

socket.on('connect', function() {
  console.log('now connected');
});

socket.on('message', function(message) {
  console.log(message)
});
