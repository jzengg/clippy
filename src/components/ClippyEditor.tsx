import React from "react";
import { DraftHandleValue, Editor, EditorState } from "draft-js";
import { SavedCharacterData } from "../types/interfaces";
import { getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
const { hasCommandModifier } = KeyBindingUtil;

const SAVE_CHARACTER_COMMAND = "myeditor-save-character";
const SELECT_DEFINITION_UP_COMMAND = "myeditor-select-definition-up";
const SELECT_DEFINITION_DOWN_COMMAND = "myeditor-select-definition-down";

function myKeyBindingFn(e: React.KeyboardEvent<{}>): string | null {
  if ((e.key === "s" || e.key === "Enter") && hasCommandModifier(e)) {
    return SAVE_CHARACTER_COMMAND;
  }
  if (e.key === "ArrowDown" && hasCommandModifier(e)) {
    return SELECT_DEFINITION_DOWN_COMMAND;
  }
  if (e.key === "ArrowUp" && hasCommandModifier(e)) {
    return SELECT_DEFINITION_UP_COMMAND;
  }
  return getDefaultKeyBinding(e);
}

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
      saveSelectedCharacter();
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
