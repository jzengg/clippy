import React from 'react';
import {Editor, EditorState, ContentState, convertToRaw, convertFromRaw} from 'draft-js';
import hanzi from 'hanzi'
import 'draft-js/dist/Draft.css';
import {getSelectionText} from 'draftjs-utils'

const STORAGE_KEY = 'clippySavedEditorState'

export default function MyEditor() {
  const savedEditorState = localStorage.getItem(STORAGE_KEY)
  const defaultEditorState = savedEditorState != null ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedEditorState))) : EditorState.createEmpty()
  const [editorState, setEditorState] = React.useState(defaultEditorState);
  React.useEffect(() => hanzi.start(), [])

const selectedText = getSelectionText(editorState)?.trim()
const decomposeData = hanzi.decompose(selectedText)
const character = decomposeData.character
const basicComponents = decomposeData?.components1 ?? []
const radicalComponents = decomposeData?.components2 ?? []
// filter out random duplicates
const definitionsData = (hanzi.definitionLookup(selectedText)?.slice(0, 3) ?? []).reduce((acc, current) => {
  if (!acc.some(x => x?.definition === current?.definition)) {
    acc.push(current)
  }
  return acc
}, [])
const simplified = definitionsData?.[0]?.simplified
const traditional = definitionsData?.[0]?.traditional

const saveText = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(convertToRaw(editorState.getCurrentContent())))
}

  return <div >
  <Editor placeholder="Paste Chinese text" editorState={editorState} onChange={setEditorState} />
  <button onClick={saveText}>Save Text</button>
  <p>
  <h3>Character: {character} {traditional != null && traditional !== simplified && `(${traditional})`}</h3>
  <h3>Basic: {basicComponents.map((component, idx) => {
    return <><span key={idx} className="red">{component}</span>({hanzi.getRadicalMeaning(component)}), </>
  }
  )}
  </h3>
    <h3>Radicals: {radicalComponents.map((component, idx) => {
    return <><span key={idx} className="red">{component}</span>({hanzi.getRadicalMeaning(component)}){idx != radicalComponents.length  - 1 && ', '}</>
  }
  )}
  </h3>
  <h3>Pinyin & Meaning</h3>
  <ol>
  {definitionsData.map((definitionData, idx) => {
    return <li key={idx}>{definitionData?.pinyin} - {definitionData?.definition}</li>
  })}
  </ol>
  </p>

</div>
}
