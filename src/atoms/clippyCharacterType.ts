import { atom } from "recoil";

const CHARACTER_TYPE_LOCAL_STORAGE_KEY = "clippyCharacterType";

export enum CharacterType {
  Simplified = "SIMPLIFIED",
  Traditional = "TRADITIONAL",
}

// @ts-ignore: implicit any
const localStorageEffect = (key: string) => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }
  onSet((newValue: any) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const clippyCharacterType = atom({
  key: "characterType",
  default: CharacterType.Simplified,
  effects_UNSTABLE: [localStorageEffect(CHARACTER_TYPE_LOCAL_STORAGE_KEY)],
});
