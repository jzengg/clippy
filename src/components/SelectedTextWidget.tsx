import React from "react";

import ExampleWordList from "components/ExampleWordList";
import ComponentList from "components/ComponentList";
import DefinitionList from "components/DefinitionList";
import CharacterWithVariation from "components/CharacterWithVariation";
import { ClippyCharacterData } from "types/interfaces";
import CharacterTypeSelector from "components/CharacterTypeSelector";
import { Box, Button, Heading } from "@chakra-ui/react";

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
      <Heading mb="1" size="md">
        Pinyin & Meaning
      </Heading>
      <Box mb="3">
        <DefinitionList
          selectedDefinitionIdx={selectedDefinitionIdx}
          handleSelectDefinition={handleSelectDefinition}
          definitions={definitionsData}
        />
      </Box>
      <Heading mb="1" size="md">
        Radicals
      </Heading>
      <Box mb="3">
        <ComponentList components={radicalComponents} />
      </Box>
      <Heading size="md">High Frequency Examples</Heading>
      <Box mb="3">
        <ExampleWordList examples={highFreqExamples} />
      </Box>
      <Heading size="md">Medium Frequency Examples</Heading>
      <Box mb="3">
        <ExampleWordList examples={mediumFreqExamples} />
      </Box>
    </div>
  );
}

export default SelectedTextWidget;
