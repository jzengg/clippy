import React from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import hanzi from "hanzi";
import "draft-js/dist/Draft.css";
import { getSelectionText } from "draftjs-utils";
import SelectedTextWidget from "./SelectedTextWidget.react";
import SavedCharacterList from "./SavedCharacterList.react";

const SAVED_EDITOR_STATE_KEY = "clippySavedEditorState";
const SAVED_CHARACTERS_DATA_KEY = "clippySavedCharactersData";

export default function ChineseEditor() {
  React.useEffect(() => hanzi.start(), []);

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
  const [savedCharactersData, setSavedCharactersData] = React.useState(() => {
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

  const addSavedCharacter = (characterData) => {
    const newState = [...savedCharactersData, { ...characterData }];
    localStorage.setItem(SAVED_CHARACTERS_DATA_KEY, JSON.stringify(newState));
    setSavedCharactersData(newState);
  };

  const removeSavedCharacter = (indexToRemove) =>
    setSavedCharactersData(
      savedCharactersData.filter((char, idx) => idx !== indexToRemove)
    );
  const exportSavedCharactersToCSV = () => {
    console.log(savedCharactersData);
    console.log("exporting", savedCharactersData);
    // should have inputs for choosing definition / meaning to export.
    // need to store all that in state and not just the character to make sure the right
    // data is exported / saved
    return savedCharactersData.map((savedCharacter) => {
      return [savedCharacter];
    });
  };

  return (
    <>
      <Editor
        placeholder="Paste Chinese text"
        editorState={editorState}
        onChange={setEditorState}
      />
      <button onClick={saveText}>Save Text</button>
      <SavedCharacterList
        handleExport={exportSavedCharactersToCSV}
        handleRemove={removeSavedCharacter}
        charactersData={savedCharactersData}
      />
      {isCharacterSelected && (
        <SelectedTextWidget
          handleSaveCharacter={addSavedCharacter}
          selectedText={selectedText}
        />
      )}
    </>
  );
}
