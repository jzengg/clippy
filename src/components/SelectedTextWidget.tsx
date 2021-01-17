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

  const className = [
    "save-character-button",
    isCharacterSavable ? "hoverable" : "disabled-button",
  ].join(" ");
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
          className={className}
          onClick={handleSaveCharacter}
          data-cy="save-button"
        >
          Save
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
