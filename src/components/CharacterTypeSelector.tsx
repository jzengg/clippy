import React from "react";
import { useRecoilState } from "recoil";
import { CharacterType, clippyCharacterType } from "atoms/clippyCharacterType";
import { Select } from "@chakra-ui/react";

export default function CharacterTypeSelector() {
  const [characterType, setCharacterType] = useRecoilState(clippyCharacterType);

  function handleChangeCharacterType(e: React.BaseSyntheticEvent) {
    const value: CharacterType = e.target.value;
    setCharacterType(value);
  }
  return (
    <Select
      value={characterType}
      className="character-type-selector"
      onChange={handleChangeCharacterType}
      size="sm"
      variant="outline"
      marginBottom="8px"
      borderRadius="8px"
    >
      <option value={CharacterType.Simplified}>Simplified</option>
      <option value={CharacterType.Traditional}>Traditional</option>
    </Select>
  );
}
