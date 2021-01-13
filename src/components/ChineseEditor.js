import React from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import hanzi from "hanzi";
import "draft-js/dist/Draft.css";
import { getSelectionText } from "draftjs-utils";
import SelectedTextWidget from "./SelectedTextWidget.react";
import SavedCharacterList from "./SavedCharacterList.react";

const STORAGE_KEY = "clippySavedEditorState";

export default function ChineseEditor() {
  React.useEffect(() => hanzi.start(), []);

  const savedEditorState = localStorage.getItem(STORAGE_KEY);
  const defaultEditorState =
    savedEditorState != null
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(savedEditorState))
        )
      : EditorState.createEmpty();
  const [editorState, setEditorState] = React.useState(defaultEditorState);
  const [savedCharacters, setSavedCharacters] = React.useState([]);

  const selectedText = getSelectionText(editorState)?.trim();
  const isCharacterSelected = selectedText != null && selectedText != "";

  const saveText = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
  };

  const addSavedCharacter = (char) =>
    setSavedCharacters([...savedCharacters, char]);

  const removeSavedCharacter = (indexToRemove) =>
    setSavedCharacters(
      savedCharacters.filter((char, idx) => idx !== indexToRemove)
    );

  return (
    <>
      <Editor
        placeholder="Paste Chinese text"
        editorState={editorState}
        onChange={setEditorState}
      />
      <button onClick={saveText}>Save Text</button>
      <SavedCharacterList
        handleRemove={removeSavedCharacter}
        characters={savedCharacters}
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
