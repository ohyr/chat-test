import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function Chat({ nickname }) {
  const messageBoxRef = useRef(null);
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io("http://localhost:9997");

    socketIo.on("connect", () => {
      console.log("connect!");
    });

    socketIo.on("disconnect", () => {
      console.log("disconnect...");
    });

    socketIo.on("chat message", (message) => {
      handleListening(message);
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
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  const handleListening = (message) => {
    setMessages((prev) => prev.concat(JSON.parse(message)));
  };

  const handleSubmit = () => {
    socket.emit("chat message", JSON.stringify({ nickname, content }));
    console.log("socket id: ", socket.id);
    setContent("");
  };

  return (
    <>
      <div>Hello {nickname} !</div>
      <p style={{ display: "flex" }}>
        <input
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
            return;
          }}
          value={content}
          autoFocus
        />
        <button type="button" onClick={handleSubmit}>
          Send
        </button>
      </p>
      <div
        ref={messageBoxRef}
        style={{
          width: "min(730px, 75%)",
          height: "30vh",
          overflowY: "auto",
          textAlign: "left",
          backgroundColor: "black",
        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{ margin: 4 }}>
            {`${message.nickname}: ${message.content}`}
          </div>
        ))}
      </div>
      <p>Chat & Listen user's messages</p>
    </>
  );
}

export default Chat;
