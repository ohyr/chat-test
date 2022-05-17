import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import Chat from "./components/Chat";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("init");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React Chatting!</p>
        <Chat />
      </header>
    </div>
  );
}

export default App;
