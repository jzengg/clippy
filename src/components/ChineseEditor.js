import React from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import hanzi from "hanzi";
import SelectedTextWidget from "./SelectedTextWidget.react";
import "draft-js/dist/Draft.css";
import { getSelectionText } from "draftjs-utils";

const STORAGE_KEY = "clippySavedEditorState";

export default function ChineseEditor() {
  const savedEditorState = localStorage.getItem(STORAGE_KEY);
  const defaultEditorState =
    savedEditorState != null
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(savedEditorState))
        )
      : EditorState.createEmpty();
  const [editorState, setEditorState] = React.useState(defaultEditorState);
  React.useEffect(() => hanzi.start(), []);

  const selectedText = getSelectionText(editorState)?.trim();
  const isCharacterSelected = selectedText != null && selectedText != "";

  const saveText = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <>
      <Editor
        placeholder="Paste Chinese text"
        editorState={editorState}
        onChange={setEditorState}
      />
      <button onClick={saveText}>Save Text</button>
      {isCharacterSelected && (
        <SelectedTextWidget selectedText={selectedText} />
      )}
    </>
  );
}
