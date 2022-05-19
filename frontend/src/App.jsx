import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import Chat from "./components/Chat";

function App() {
  const [count, setCount] = useState(0);
  const [isJoin, setIsJoin] = useState(false);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    console.log("init");
  }, []);

  const handleJoin = () => {
    if (nickname === "") {
      return;
    }
    setIsJoin(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!isJoin ? (
          <>
            <p>Hello Vite + React Chatting!</p>
            <p style={{ display: "flex" }}>
              {`Set your nickname -> `}
              <input onChange={(e) => setNickname(e.target.value)} />
              <button type="button" onClick={handleJoin}>
                Join
              </button>
            </p>
          </>
        ) : (
          <Chat nickname={nickname} />
        )}
      </header>
    </div>
  );
}

export default App;
