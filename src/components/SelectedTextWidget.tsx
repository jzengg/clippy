import React from "react";

import ExampleWordList from "components/ExampleWordList";
import ComponentList from "components/ComponentList";
import DefinitionList from "components/DefinitionList";
import CharacterWithVariation from "components/CharacterWithVariation";
import { ClippyCharacterData } from "types/interfaces";
import CharacterTypeSelector from "components/CharacterTypeSelector";
import { Button } from "@chakra-ui/react";

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

  function handleSelectDefinition(value: React.ReactText) {
    setSelectedDefinitionIdx(parseInt(value.toString()));
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
        <div className="selected-character-buttons">
          <CharacterTypeSelector />
          <Button
            size="sm"
            onClick={handleSaveCharacter}
            isDisabled={!isCharacterSavable}
            data-cy="save-button"
            colorScheme="blue"
          >
            Save
          </Button>
        </div>
      </div>
      <h3>Pinyin & Meaning</h3>
      <DefinitionList
        selectedDefinitionIdx={selectedDefinitionIdx}
        handleSelectDefinition={handleSelectDefinition}
        definitions={definitionsData}
      />
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
