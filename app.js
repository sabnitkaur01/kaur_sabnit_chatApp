// const { Socket } = require('dgram');
const express = require('express'); // like a PHP require 
const path = require('path');

const messenger = require('socket.io')();

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 5050;
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));

});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});



const server = app.listen(port, () => {
  console.log(`app is running on ${port}`);
});



messenger.on('connection', (Socket) => {
  console.log(`a user connected: ${Socket.id}`);

  Socket.emit('connected', { sID: `${socket.id}`, message: 'new connection '});
  socket.on('chatmessage', function(msg) {
    console.log(msg);


    messenger.emit('message', { id: socket.id, message:msg });

  });

  socket.on('disconnect', () => {
    console.log('a user has disconnected');
  })
});