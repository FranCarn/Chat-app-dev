const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {},
});

io.on("connection", (socket) => {
  socket.on("join", ({ room, global }) => {
    if (global) socket.join(1);
    else socket.join(room);
  });

  socket.on("sendMessage", (messageData) => {
    socket.to(messageData.room).emit("receivedMessage", messageData);
  });

  socket.on("disconnect", () => {
    console.log(`Usuario ${socket.id} desconectado`);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
