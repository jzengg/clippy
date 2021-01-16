import React from "react";
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  DraftHandleValue,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { getSelectionText } from "draftjs-utils";
import { SavedCharacterData } from "../types/interfaces";
import SelectedTextWidget from "./SelectedTextWidget";
import SavedCharacterList from "./SavedCharacterList";
import { getSavedCharacterData } from "../lib/hanziwrapper";
import { getDefaultKeyBinding, KeyBindingUtil } from "draft-js";

const { hasCommandModifier } = KeyBindingUtil;

function myKeyBindingFn(e: React.KeyboardEvent<{}>): string | null {
  if (e.key === "s" && hasCommandModifier(e)) {
    return SAVE_CHARACTER_COMMAND;
  }
  if (e.key === "j" && hasCommandModifier(e)) {
    return SELECT_DEFINITION_DOWN_COMMAND;
  }
  if (e.key === "k" && hasCommandModifier(e)) {
    return SELECT_DEFINITION_UP_COMMAND;
  }
  return getDefaultKeyBinding(e);
}

const SAVE_CHARACTER_COMMAND = "myeditor-save-character";
const SELECT_DEFINITION_UP_COMMAND = "myeditor-select-definition-up";
const SELECT_DEFINITION_DOWN_COMMAND = "myeditor-select-definition-down";

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
  const [selectedText, setSelectedText] = React.useState<string | null>(null);
  const onChange = React.useCallback(
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

  const [savedCharactersData, setSavedCharactersData] = React.useState<
    SavedCharacterData[]
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
  const [exportData, setExportData] = React.useState<string | null>(null);
  const [selectedDefinitionIdx, setSelectedDefinitionIdx] = React.useState(0);

  const selectedCharacterData =
    selectedText != null && selectedText !== ""
      ? getSavedCharacterData(selectedText, selectedDefinitionIdx)
      : null;
  function addSavedCharacter() {
    if (selectedCharacterData != null) {
      const newState = [...savedCharactersData, { ...selectedCharacterData }];
      localStorage.setItem(SAVED_CHARACTERS_DATA_KEY, JSON.stringify(newState));
      setSavedCharactersData(newState);
      setExportData(null);
    }
  }
  function removeSavedCharacter(indexToRemove: number) {
    const newState = savedCharactersData.filter(
      (_char, idx) => idx !== indexToRemove
    );
    localStorage.setItem(SAVED_CHARACTERS_DATA_KEY, JSON.stringify(newState));
    setSavedCharactersData(newState);
    setExportData(null);
  }

  function handleKeyCommand(command: string): DraftHandleValue {
    if (command === SAVE_CHARACTER_COMMAND) {
      addSavedCharacter();
      return "handled";
    }
    if (
      command === SELECT_DEFINITION_DOWN_COMMAND &&
      selectedCharacterData != null &&
      selectedDefinitionIdx + 1 < selectedCharacterData.definitionsData.length
    ) {
      setSelectedDefinitionIdx(selectedDefinitionIdx + 1);
      return "handled";
    }
    if (
      command === SELECT_DEFINITION_UP_COMMAND &&
      selectedDefinitionIdx - 1 >= 0
    ) {
      setSelectedDefinitionIdx(selectedDefinitionIdx - 1);
      return "handled";
    }
    return "not-handled";
  }

  return (
    <div className="grid-root">
      <div className="grid-col-saved-characters">
        <SavedCharacterList
          setSelectedText={setSelectedText}
          handleRemove={removeSavedCharacter}
          charactersData={savedCharactersData}
          setExportData={setExportData}
          exportData={exportData}
        />
      </div>
      <div className="grid-col-editor">
        <Editor
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={myKeyBindingFn}
          placeholder="Paste Chinese text"
          editorState={editorState}
          onChange={onChange}
        />
      </div>
      <div className="grid-col">
        {selectedCharacterData != null && (
          <SelectedTextWidget
            selectedDefinitionIdx={selectedDefinitionIdx}
            setSelectedDefinitionIdx={setSelectedDefinitionIdx}
            selectedCharacterData={selectedCharacterData}
            handleSaveCharacter={addSavedCharacter}
          />
        )}
      </div>
    </div>
  );
}
