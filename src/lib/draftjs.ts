import React from "react";
import { getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
const { hasCommandModifier } = KeyBindingUtil;

export const SAVE_CHARACTER_COMMAND = "myeditor-save-character";
export const SELECT_DEFINITION_UP_COMMAND = "myeditor-select-definition-up";
export const SELECT_DEFINITION_DOWN_COMMAND = "myeditor-select-definition-down";

export function myKeyBindingFn(e: React.KeyboardEvent<{}>): string | null {
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
