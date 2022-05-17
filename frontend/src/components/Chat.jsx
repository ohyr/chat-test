import { useState } from "react";
import { io } from "socket.io-client";

function Chat() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const socket = io("http://localhost:9997");

  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("disconnect", () => {
    console.log(socket.id);
  });

  socket.on("chat message", (msg) => {
    setMessages(messages.concat(msg));
  });

  const handleSumbit = () => {
    socket.emit("chat message", msg);
  };

  return (
    <>
      <p style={{ display: "flex" }}>
        <input onChange={(e) => setMsg(e.target.value)} />
        <button type="button" onClick={handleSumbit}>
          send
        </button>
      </p>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
      <p>Chat & Listen user's messages</p>
    </>
  );
}

export default Chat;
