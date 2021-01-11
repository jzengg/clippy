import React from 'react';
import {Editor, EditorState, ContentState} from 'draft-js';
import hanzi from 'hanzi'
import 'draft-js/dist/Draft.css';
import {getSelectionText} from 'draftjs-utils'

export default function MyEditor() {

  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(
  ));
  React.useEffect(() => hanzi.start(), [])

const selectedText = getSelectionText(editorState)?.trim()
const {character, components1, components2 } = hanzi.decompose(selectedText)
// filter out random duplicates
const definitionsData = (hanzi.definitionLookup(selectedText)?.slice(0, 3) ?? []).reduce((acc, current) => {
  if (!acc.some(x => x?.definition === current?.definition)) {
    acc.push(current)
  }
  return acc
}, [])
const simplified = definitionsData?.[0]?.simplified
const traditional = definitionsData?.[0]?.traditional
const decomp1 = components1?.map(component => `${component}(${hanzi.getRadicalMeaning(component)})`).join(', ')
const decomp2 = components2?.map(component => `${component}(${hanzi.getRadicalMeaning(component)})`).join(', ')

  return <div >
  <Editor placeholder="Paste Chinese text" editorState={editorState} onChange={setEditorState} />
  <p>
  <h2>Character: {character} {traditional != null && traditional !== simplified && `(${traditional})`}</h2>
  <h2>Pinyin & Meaning</h2>
  <ol>
  {definitionsData.map((definitionData, idx) => {
    return <li key={idx}>{definitionData?.pinyin} - {definitionData?.definition}</li>
  })}
  </ol>
  <h2>Basic: {decomp1}</h2>
  <h2>Radicals: {decomp2}</h2>
  </p>

</div>
}
