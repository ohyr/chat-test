import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const port = 9997;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome chat server</h1>");
});

io.on("connection", (socket) => {
  console.log("connected!");

  socket.on("join", (user) => {
    io.emit("join", user);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("disconnected!");
  });
});

httpServer.listen(port, () => {
  console.log(`Listening on ${port}`);
});
