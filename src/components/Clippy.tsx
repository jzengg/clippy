import React from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { getSelectionText } from "draftjs-utils";
import { ClippyCharacterData } from "types/interfaces";
import SelectedTextWidget from "components/SelectedTextWidget";
import SavedCharacterList from "components/SavedCharacterList";
import {
  getCharacterData,
  getCharacterPrimaryAndAlternate,
} from "lib/hanziwrapper";
import { ClippyEditor } from "components/ClippyEditor";
import PlaceholderText from "components/PlaceholderText";
import { clippyCharacterType } from "atoms/clippyCharacterType";
import { useRecoilValue } from "recoil";

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
  const characterType = useRecoilValue(clippyCharacterType);
  const [selectedDefinitionIdx, setSelectedDefinitionIdx] = React.useState(0);
  const selectedCharacterData =
    selectedText != null && selectedText !== ""
      ? getCharacterData({
          text: selectedText,
          definitionIdx: selectedDefinitionIdx,
          characterType,
        })
      : null;

  function setSavedCharactersDataWithLocalStorage(
    newState: ClippyCharacterData[]
  ) {
    localStorage.setItem(SAVED_CHARACTERS_DATA_KEY, JSON.stringify(newState));
    setSavedCharactersData(newState);
  }
  const {
    characterPrimary: selectedCharacterPrimary,
  } = getCharacterPrimaryAndAlternate({
    simplified: selectedCharacterData?.simplified ?? null,
    traditional: selectedCharacterData?.traditional ?? null,
    characterType,
  });
  const isSelectedCharacterSavable =
    selectedCharacterData != null &&
    !savedCharactersData
      .map(
        (data) =>
          getCharacterPrimaryAndAlternate({
            simplified: data.simplified,
            traditional: data.traditional,
            characterType,
          }).characterPrimary
      )
      .includes(selectedCharacterPrimary);

  function saveSelectedCharacter() {
    if (selectedCharacterData != null && isSelectedCharacterSavable) {
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

  function onEditorChange(newEditorState: EditorState) {
    const selectionText = getSelectionText(newEditorState)?.trim();
    setSelectedText(selectionText);
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    if (contentState !== editorState.getCurrentContent()) {
      const serializedContent = JSON.stringify(convertToRaw(contentState));
      localStorage.setItem(SAVED_EDITOR_STATE_KEY, serializedContent);
    }
  }

  return (
    <div className="grid-root">
      <div className="grid-col-saved-characters">
        {savedCharactersData.length > 0 ? (
          <SavedCharacterList
            selectedText={selectedText}
            setSelectedDefinitionIdx={setSelectedDefinitionIdx}
            setSelectedText={setSelectedText}
            handleRemove={removeSavedCharacter}
            charactersData={savedCharactersData}
          />
        ) : (
          <PlaceholderText
            title="Save a character"
            text="Export saved characters to Anki"
          />
        )}
      </div>
      <div className="grid-col-editor" data-cy="editor">
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
        {selectedCharacterData != null && selectedCharacterPrimary != null ? (
          <SelectedTextWidget
            isCharacterSavable={isSelectedCharacterSavable}
            selectedDefinitionIdx={selectedDefinitionIdx}
            setSelectedDefinitionIdx={setSelectedDefinitionIdx}
            selectedCharacterData={selectedCharacterData}
            handleSaveCharacter={saveSelectedCharacter}
          />
        ) : (
          <PlaceholderText
            title="See more information"
            text="Select a character to get started"
          />
        )}
      </div>
    </div>
  );
}
