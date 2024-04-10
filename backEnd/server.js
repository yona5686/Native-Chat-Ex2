const express = require("express");
const Socket = require("socket.io");
const PORT = 3000;

const app = express();
const server = require("http").createServer(app);

const io = Socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("connectToChat", (user) => {
    console.log(user);
  });
  socket.on("message", (message, user) => {
    console.log("message:", message, user);
    io.emit("message", message, user);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
