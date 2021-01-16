import React from "react";

import ExampleWordList from "./ExampleWordList";
import ComponentList from "./ComponentList";
import DefinitionList from "./DefinitionList";
import CharacterWithVariation from "./CharacterWithVariation";
import { ClippyCharacterData } from "../types/interfaces";

type Props = {
  selectedCharacterData: ClippyCharacterData;
  handleSaveCharacter: () => void;
  selectedDefinitionIdx: number;
  setSelectedDefinitionIdx: (idx: number) => void;
  isCharacterSavable: boolean;
};

function SelectedTextWidget({
  isCharacterSavable,
  selectedCharacterData: {
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
  React.useEffect(() => {
    if (selectedDefinitionIdx > definitionsData.length - 1) {
      setSelectedDefinitionIdx(0);
    }
  }, [definitionsData, selectedDefinitionIdx]);

  function handleSelectDefinition(e: React.BaseSyntheticEvent) {
    setSelectedDefinitionIdx(parseInt(e.target.value));
  }

  return (
    <div className="sticky">
      <div className="selected-character-header">
        <h3 className="selected-character">
          <CharacterWithVariation
            simplified={simplified}
            traditional={traditional}
          />
        </h3>
        <button
          disabled={!isCharacterSavable}
          className={isCharacterSavable ? "hoverable" : "disabled-button"}
          onClick={handleSaveCharacter}
        >
          Save Character
        </button>
      </div>
      <h3>Pinyin & Meaning</h3>
      <DefinitionList
        selectedDefinitionIdx={selectedDefinitionIdx}
        handleSelectDefinition={handleSelectDefinition}
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
