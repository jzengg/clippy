import React from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { getSelectionText } from "draftjs-utils";
import { ChineseCharacterData } from "../types/interfaces";
import SelectedTextWidget from "./SelectedTextWidget";
import SavedCharacterList from "./SavedCharacterList";

const SAVED_EDITOR_STATE_KEY = "clippySavedEditorState";
const SAVED_CHARACTERS_DATA_KEY = "clippySavedCharactersData";

export default function ChineseEditor() {
  const [editorState, setEditorState] = React.useState(() => {
    const savedEditorState = localStorage.getItem(SAVED_EDITOR_STATE_KEY);
    const defaultEditorState =
      savedEditorState != null
        ? EditorState.createWithContent(
            convertFromRaw(JSON.parse(savedEditorState))
          )
        : EditorState.createEmpty();
    return defaultEditorState;
  });
  const [savedCharactersData, setSavedCharactersData] = React.useState<
    ChineseCharacterData[]
  >(() => {
    const persistedSavedCharactersData = localStorage.getItem(
      SAVED_CHARACTERS_DATA_KEY
    );
    const defaultSavedCharactersData =
      persistedSavedCharactersData != null
        ? JSON.parse(persistedSavedCharactersData)
        : [];
    return defaultSavedCharactersData;
  });

  const selectedText = getSelectionText(editorState)?.trim();
  const isCharacterSelected = selectedText != null && selectedText != "";

  const saveText = () => {
    localStorage.setItem(
      SAVED_EDITOR_STATE_KEY,
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
  };

  function addSavedCharacter(ChineseCharacterData: ChineseCharacterData) {
    const newState = [...savedCharactersData, { ...ChineseCharacterData }];
    localStorage.setItem(SAVED_CHARACTERS_DATA_KEY, JSON.stringify(newState));
    setSavedCharactersData(newState);
  }

  function removeSavedCharacter(indexToRemove: number) {
    return setSavedCharactersData(
      savedCharactersData.filter((_char, idx) => idx !== indexToRemove)
    );
  }

  return (
    <div className="grid-root">
      <div className="grid-col">
        <SavedCharacterList
          handleRemove={removeSavedCharacter}
          charactersData={savedCharactersData}
        />
      </div>
      <div className="grid-col">
        <Editor
          placeholder="Paste Chinese text"
          editorState={editorState}
          onChange={setEditorState}
        />
        <button onClick={saveText}>Save Text</button>
      </div>
      <div className="grid-col">
        {isCharacterSelected && (
          <SelectedTextWidget
            handleSaveCharacter={addSavedCharacter}
            selectedText={selectedText}
          />
        )}
      </div>
    </div>
  );
}
