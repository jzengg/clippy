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

  return <div >
  <Editor placeholder="Paste Chinese text" editorState={editorState} onChange={setEditorState} />
  <p>
  <h3>Character: {character} {traditional != null && traditional !== simplified && `(${traditional})`}</h3>
  <h3>Pinyin & Meaning</h3>
  <ol>
  {definitionsData.map((definitionData, idx) => {
    return <li key={idx}>{definitionData?.pinyin} - {definitionData?.definition}</li>
  })}
  </ol>
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
  </p>

</div>
}
