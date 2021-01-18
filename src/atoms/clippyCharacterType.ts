import { atom } from "recoil";

export enum CharacterType {
  Simplified = "SIMPLIFIED",
  Traditional = "TRADITIONAL",
}

export const clippyCharacterType = atom({
  key: "characterType",
  default: CharacterType.Simplified,
});
