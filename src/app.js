const http = require('http');
const express = require('express');
const cors = require('cors');
const io = require('socket.io');


// setup server
const app = express();
const server = http.createServer(app);

const socketIO = io(server);

// allow cors
app.use(cors());

app.get('/', (req, res) => {
  res.send('From Backpack With ♥️');
});

server.listen('4008', () => {
  console.log('Listening to port 4008');
});


socketIO.on('connection', (socket) => {
  // remaining steps
  console.log('socket connected');
  
  socket.on('client:message', data => {
    console.log(data);
    socket.broadcast.emit('server:message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

