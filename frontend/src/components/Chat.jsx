import { useState } from "react";
import { io } from "socket.io-client";

function Chat() {
  const [msg, setMsg] = useState("");

  const socket = io("http://localhost:9997");

  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("disconnect", () => {
    console.log(socket.id);
  });

  const handleSumbit = () => {};

  return (
    <>
      <p style={{ display: "flex" }}>
        <input onChange={(e) => setMsg(e.target.value)} />
        <button type="button" onClick={handleSumbit}>
          send
        </button>
      </p>
      <p>
        Edit <code>App.jsx</code> and save to test HMR updates.
      </p>
    </>
  );
}

export default Chat;
