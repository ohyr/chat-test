import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Chat() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(io("http://localhost:9997"));

  useEffect(() => {
    const socketIo = io("http://localhost:9997");

    socketIo.on("connect", () => {
      console.log("connect!");
    });

    socketIo.on("disconnect", () => {
      console.log("disconnect...");
    });

    socketIo.on("chat message", (msg) => {
      handleListening(msg);
    });

    setSocket(socketIo);
  }, []);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const handleListening = (msg) => {
    setMessages((msgs) => msgs.concat(msg));
  };

  const handleSumbit = () => {
    socket.emit("chat message", msg);
    console.log("socket id: ", socket.id);
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
