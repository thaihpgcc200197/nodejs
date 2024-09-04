const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware setup
app.use(express.static(path.join(__dirname, 'assets'))); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors()); 

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// Socket.IO setup
io.on('connection', (socket) => {
  
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on("send", (data) => {
    socket.broadcast.emit("new-notification", data);
  }); 
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  
});
