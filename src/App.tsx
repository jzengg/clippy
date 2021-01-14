import "./App.css";
import ChineseEditor from "./components/ChineseEditor";
import React from "react";
import hanzi from "hanzi";

function App() {
  React.useEffect(() => hanzi.start(), []);
  return (
    <div className="App">
      <ChineseEditor />
    </div>
  );
}

export default App;
