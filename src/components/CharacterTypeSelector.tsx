import React from "react";
import { useRecoilState } from "recoil";
import { CharacterType, clippyCharacterType } from "atoms/clippyCharacterType";

export default function CharacterTypeSelector() {
  const [characterType, setCharacterType] = useRecoilState(clippyCharacterType);

  function handleChangeCharacterType(e: React.BaseSyntheticEvent) {
    const value: CharacterType = e.target.value;
    setCharacterType(value);
  }
  return (
    <select
      value={characterType}
      className="character-type-selector"
      onChange={handleChangeCharacterType}
    >
      <option value={CharacterType.Simplified}>Simplified</option>
      <option value={CharacterType.Traditional}>Traditional</option>
    </select>
  );
}
