import React from "react";
import CharacterTypeSelector from "./CharacterTypeSelector";
export default function Header() {
  return (
    <div className="header">
      <h1 className="header-title red">Clippy</h1> <CharacterTypeSelector />
    </div>
  );
}
