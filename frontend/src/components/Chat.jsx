import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function Chat({ nickname }) {
  const msgBoxRef = useRef(null);
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (msgBoxRef.current) {
      msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
    }
  };

  const handleListening = (msg) => {
    setMessages((msgs) => msgs.concat(msg));
  };

  const handleSubmit = () => {
    socket.emit("chat message", msg);
    console.log("socket id: ", socket.id);
    setMsg("");
  };

  return (
    <>
      <div>Hello {nickname} !</div>
      <p style={{ display: "flex" }}>
        <input
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
            return;
          }}
          value={msg}
        />
        <button type="button" onClick={handleSubmit}>
          Send
        </button>
      </p>
      <div
        ref={msgBoxRef}
        style={{
          width: "min(375px, 60%)",
          height: "20vh",
          overflowY: "auto",
          textAlign: "left",
        }}
      >
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <p>Chat & Listen user's messages</p>
    </>
  );
}

export default Chat;
