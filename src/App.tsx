import "./App.css";
import React from "react";
import hanzi from "hanzi";
import Clippy from "./components/Clippy";
import { RecoilRoot } from "recoil";
import Header from "./components/Header";

function App() {
  React.useEffect(() => hanzi.start(), []);
  return (
    <RecoilRoot>
      <Header />
      <div className="App">
        <Clippy />
      </div>
    </RecoilRoot>
  );
}

export default App;
