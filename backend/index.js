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
  console.log("connected!", socket.id);

  const userInfo = [];

  socket.on("join", (user) => {
    console.log("join!", user, socket.id);

    userInfo[socket.id] = user;
    io.emit("join", user);
  });

  socket.on("leave", (user) => {
    console.log("leave!", user, socket.id);
    io.emit("leave", user);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("user list", () => {
    io.emit("user list", userInfo);
  });

  socket.on("disconnect", () => {
    console.log("disconnected!", socket.id);
    io.emit("leave", userInfo[socket.id]);
  });
});

httpServer.listen(port, () => {
  console.log(`Listening on ${port}`);
});
