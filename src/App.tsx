import "./App.css";
import React from "react";
import hanzi from "hanzi";
import Clippy from "./components/Clippy";

function App() {
  React.useEffect(() => hanzi.start(), []);
  return (
    <>
      <h1 className="main-header red">Clippy</h1>
      <div className="App">
        <Clippy />
      </div>
    </>
  );
}

export default App;
