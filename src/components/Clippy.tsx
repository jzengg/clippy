import React from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { getSelectionText } from "draftjs-utils";
import { ClippyCharacterData } from "../types/interfaces";
import SelectedTextWidget from "./SelectedTextWidget";
import SavedCharacterList from "./SavedCharacterList";
import { getCharacterData } from "../lib/hanziwrapper";
import { ClippyEditor } from "./ClippyEditor";

const SAVED_EDITOR_STATE_KEY = "clippySavedEditorState";
const SAVED_CHARACTERS_DATA_KEY = "clippySavedCharactersData";

export default function Clippy() {
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
  const [selectedText, setSelectedText] = React.useState<string | null>(null);

  const [savedCharactersData, setSavedCharactersData] = React.useState<
    ClippyCharacterData[]
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
  const [selectedDefinitionIdx, setSelectedDefinitionIdx] = React.useState(0);
  const selectedCharacterData =
    selectedText != null && selectedText !== ""
      ? getCharacterData(selectedText, selectedDefinitionIdx)
      : null;

  const onEditorChange = React.useCallback(
    (newEditorState) => {
      const selectionText = getSelectionText(newEditorState)?.trim();
      setSelectedText(selectionText);
      setEditorState(newEditorState);
      const contentState = newEditorState.getCurrentContent();
      if (contentState !== editorState.getCurrentContent()) {
        const serializedContent = JSON.stringify(convertToRaw(contentState));
        localStorage.setItem(SAVED_EDITOR_STATE_KEY, serializedContent);
      }
    },
    [editorState, setEditorState]
  );

  function setSavedCharactersDataWithLocalStorage(
    newState: ClippyCharacterData[]
  ) {
    localStorage.setItem(SAVED_CHARACTERS_DATA_KEY, JSON.stringify(newState));
    setSavedCharactersData(newState);
  }
  function saveSelectedCharacter() {
    if (
      selectedCharacterData != null &&
      !savedCharactersData
        .map((data) => data.simplified)
        .includes(selectedCharacterData.simplified)
    ) {
      const newState = [...savedCharactersData, { ...selectedCharacterData }];
      setSavedCharactersDataWithLocalStorage(newState);
    }
  }
  function removeSavedCharacter(indexToRemove: number) {
    const newState = savedCharactersData.filter(
      (_char, idx) => idx !== indexToRemove
    );
    setSavedCharactersDataWithLocalStorage(newState);
  }

  return (
    <div className="grid-root">
      <div className="grid-col-saved-characters">
        <SavedCharacterList
          selectedText={selectedText}
          setSelectedDefinitionIdx={setSelectedDefinitionIdx}
          setSelectedText={setSelectedText}
          handleRemove={removeSavedCharacter}
          charactersData={savedCharactersData}
        />
      </div>
      <div className="grid-col-editor">
        <ClippyEditor
          saveSelectedCharacter={saveSelectedCharacter}
          selectedCharacterData={selectedCharacterData}
          selectedDefinitionIdx={selectedDefinitionIdx}
          setSelectedDefinitionIdx={setSelectedDefinitionIdx}
          editorState={editorState}
          onChange={onEditorChange}
        />
      </div>
      <div className="grid-col">
        {selectedCharacterData != null && (
          <SelectedTextWidget
            selectedDefinitionIdx={selectedDefinitionIdx}
            setSelectedDefinitionIdx={setSelectedDefinitionIdx}
            selectedCharacterData={selectedCharacterData}
            handleSaveCharacter={saveSelectedCharacter}
          />
        )}
      </div>
    </div>
  );
}
