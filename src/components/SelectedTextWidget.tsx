import React from "react";

import ExampleWordList from "./ExampleWordList";
import ComponentList from "./ComponentList";
import DefinitionList from "./DefinitionList";
import CharacterWithVariation from "./CharacterWithVariation";
import { DefinitionData, ChineseCharacterData } from "../types/interfaces";
import {
  decomposeCharacter,
  definitionLookup,
  getExampleUsages,
  getRadicalMeaning,
} from "../lib/hanziwrapper";

type Props = {
  selectedText: string;
  handleSaveCharacter: (char: ChineseCharacterData) => void;
};

function SelectedTextWidget({ selectedText, handleSaveCharacter }: Props) {
  const [selectedDefinitionIdx, setSelectedDefinitionIdx] = React.useState(0);
  const decomposeData = decomposeCharacter(selectedText);
  const character = decomposeData.character;
  const basicComponents = (decomposeData?.components1 ?? []).filter(
    (component) => component !== "No glyph available"
  );
  const radicalComponents = (decomposeData?.components2 ?? []).filter(
    (component) => component !== "No glyph available"
  );
  // filter out random duplicates
  const rawDefinitionsData = definitionLookup(selectedText) || [];
  const definitionsData: DefinitionData[] = [];
  const seenDefinitions = new Set();
  rawDefinitionsData.slice(0, 10).forEach((definitionData) => {
    if (!seenDefinitions.has(definitionData.definition)) {
      definitionsData.push(definitionData);
    } else {
      seenDefinitions.add(definitionData.definition);
    }
  });

  // show high frequency examples with their pinyin and meaning?
  // update layout so we can show list of chars to save, should be backed up to local storage until cleared?
  // have a list of characters to save. button to export to csv. ui to select export format? checkboxes to select which columns to export?
  const simplified = definitionsData?.[0]?.simplified;
  const traditional =
    definitionsData
      .map((data) => data.traditional)
      .find((char) => char != simplified) ?? null;
  const examples = getExampleUsages(character);
  const highFreqExamples = examples?.[0]?.slice(0, 3) ?? [];
  const mediumFreqExamples = examples?.[1]?.slice(0, 3) ?? [];

  return (
    <div className="sticky">
      <h3>
        Character:{" "}
        <CharacterWithVariation
          simplified={simplified}
          traditional={traditional}
        />
      </h3>
      <button
        onClick={() =>
          handleSaveCharacter({
            simplified,
            traditional,
            definitionData: definitionsData?.[selectedDefinitionIdx],
            basicComponents: basicComponents.map((component) => ({
              component,
              meaning: getRadicalMeaning(component),
            })),
            radicalComponents: radicalComponents.map((component) => ({
              component,
              meaning: getRadicalMeaning(component),
            })),
            examples: [...highFreqExamples, ...mediumFreqExamples],
          })
        }
      >
        Save Character
      </button>
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
