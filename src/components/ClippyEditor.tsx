import React from "react";
import { DraftHandleValue, Editor, EditorState } from "draft-js";
import {
  SAVE_CHARACTER_COMMAND,
  SELECT_DEFINITION_DOWN_COMMAND,
  SELECT_DEFINITION_UP_COMMAND,
  myKeyBindingFn,
} from "../lib/draftjs";
import { SavedCharacterData } from "../types/interfaces";

type Props = {
  saveSelectedCharacter: () => void;
  selectedCharacterData: SavedCharacterData | null;
  selectedDefinitionIdx: number;
  setSelectedDefinitionIdx: (idx: number) => void;
  editorState: EditorState;
  onChange: (newEditorState: EditorState) => void;
};

export function ClippyEditor({
  saveSelectedCharacter,
  selectedCharacterData,
  selectedDefinitionIdx,
  setSelectedDefinitionIdx,
  editorState,
  onChange,
}: Props) {
  function handleKeyCommand(command: string): DraftHandleValue {
    if (command === SAVE_CHARACTER_COMMAND) {
      saveSelectedCharacter;
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
    <Editor
      handleKeyCommand={handleKeyCommand}
      keyBindingFn={myKeyBindingFn}
      placeholder="Paste Chinese text"
      editorState={editorState}
      onChange={onChange}
    />
  );
}
