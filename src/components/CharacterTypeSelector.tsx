import React from "react";
import { useRecoilState } from "recoil";
import {
  CharacterType,
  clippyCharacterType,
} from "src/atoms/clippyCharacterType";

export default function CharacterTypeSelector() {
  const [characterType, setCharacterType] = useRecoilState(clippyCharacterType);

  function handleChangeCharacterType(e: React.BaseSyntheticEvent) {
    const value: CharacterType = e.target.value;
    setCharacterType(value);
  }
  return (
    <select
      data-cy="character-type-selector"
      onChange={handleChangeCharacterType}
    >
      <option
        selected={characterType === CharacterType.Simplified}
        value={CharacterType.Simplified}
      >
        Simplified
      </option>
      <option
        selected={characterType === CharacterType.Traditional}
        value={CharacterType.Traditional}
      >
        Traditional
      </option>
    </select>
  );
}
