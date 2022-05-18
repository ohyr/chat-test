import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Chat() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(io("http://localhost:9997"));

  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [someonePosition, setSomeonePosition] = useState({ x: 0, y: 0 });

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

    socketIo.on("move virtual position", (pos) => {
      handleVirtualPosition(pos);
    });

    setSocket(socketIo);

    window.addEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    const position = { x: posX, y: posY };
    handleChangePosition(position);
  }, [posX, posY]);

  const handleListening = (msg) => {
    setMessages((msgs) => msgs.concat(msg));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "w") {
      setPosX((x) => x + 1);
    } else if (e.key === "ArrowLeft" || e.key === "a") {
      setPosY((y) => y - 1);
    } else if (e.key === "ArrowDown" || e.key === "s") {
      setPosX((x) => x - 1);
    } else if (e.key === "ArrowRight" || e.key === "d") {
      setPosY((y) => y + 1);
    }
  };

  const handleVirtualPosition = (pos) => {
    setSomeonePosition(pos);
  };

  const handleChangePosition = (pos) => {
    socket.emit("move virtual position", pos);
  };

  const handleSumbit = () => {
    socket.emit("chat message", msg);
    console.log("socket id: ", socket.id);
  };

  return (
    <>
      <p>
        My position: {`x: ${posX}, y: ${posY} / `}
        Someone position: {`x: ${someonePosition.x}, y: ${someonePosition.y}`}
      </p>
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
