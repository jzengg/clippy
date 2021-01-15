import React from "react";

import ExampleWordList from "./ExampleWordList";
import ComponentList from "./ComponentList";
import DefinitionList from "./DefinitionList";
import CharacterWithVariation from "./CharacterWithVariation";
import { SavedCharacterData } from "../types/interfaces";

type Props = {
  savedCharacterData: SavedCharacterData;
  handleSaveCharacter: () => void;
  selectedDefinitionIdx: number;
  setSelectedDefinitionIdx: (idx: number) => void;
};

function SelectedTextWidget({
  savedCharacterData: {
    simplified,
    traditional,
    definitionsData,
    basicComponents,
    radicalComponents,
    mediumFreqExamples,
    highFreqExamples,
  },
  handleSaveCharacter,
  selectedDefinitionIdx,
  setSelectedDefinitionIdx,
}: Props) {
  return (
    <div className="sticky">
      <div className="selected-character-header">
        <h3 className="selected-character">
          <CharacterWithVariation
            simplified={simplified}
            traditional={traditional}
          />
        </h3>
        <button onClick={handleSaveCharacter}>Save Character</button>
      </div>
      <h3>Pinyin & Meaning</h3>
      <DefinitionList
        selectedDefinitionIdx={selectedDefinitionIdx}
        handleSelectDefinition={setSelectedDefinitionIdx}
        definitions={definitionsData}
      />
      <h3>
        Basic <ComponentList components={basicComponents} />
      </h3>
      <h3>
        Radicals <ComponentList components={radicalComponents} />
      </h3>
      <h3>Example Words</h3>
      <h4>High Frequency</h4>
      <ExampleWordList examples={highFreqExamples} />
      <h4>Medium Frequency</h4>
      <ExampleWordList examples={mediumFreqExamples} />
    </div>
  );
}

export default SelectedTextWidget;
