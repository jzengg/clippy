import hanzi from "hanzi";
import pinyinize from "pinyinize";
import { CharacterType } from "atoms/clippyCharacterType";

import {
  DefinitionData,
  ClippyCharacterData,
  RadicalDecompositionData,
} from "types/interfaces";

export function getRadicalMeaning(character: string): string {
  return hanzi.getRadicalMeaning(character);
}

export function decomposeCharacterToRadicals(
  character: string
): RadicalDecompositionData {
  // only get radical decomposition
  const rawData = hanzi.decompose(character, 2);
  return { character: rawData?.character ?? null, components: rawData.components ?? [] };
}

export function definitionLookup(character: string): DefinitionData[] | null {
  return hanzi.definitionLookup(character) ?? null;
}

export function getExampleUsages(
  character: string | null
): [DefinitionData[], DefinitionData[]] {
  return hanzi.getExamples(character);
}

function convertToneNumberToMark(word: string) {
  return pinyinize(word.replace("5", ""));
}

function cleanDefinitionData(definitionData: DefinitionData): DefinitionData {
  return {
    ...definitionData,
    pinyin: convertToneNumberToMark(definitionData.pinyin),
  };
}

function filterDefinitionsData({
  rawDefinitionsData,
  limit,
}: {
  rawDefinitionsData: DefinitionData[] | null;
  limit: number;
}): DefinitionData[] {
  if (rawDefinitionsData == null) {
    return [];
  }
  const definitionsData: DefinitionData[] = [];
  // filter out data with duplicate definitions
  const seenDefinitions = new Set();
  rawDefinitionsData
    .filter((definitionData) => !definitionData.definition.includes("surname"))
    .slice(0, limit)
    .forEach((definitionData) => {
      if (!seenDefinitions.has(definitionData.definition)) {
        definitionsData.push(cleanDefinitionData(definitionData));
      } else {
        seenDefinitions.add(definitionData.definition);
      }
    });
  return definitionsData;
}

export function getCharacterData({
  text,
  definitionIdx,
  characterType,
}: {
  text: string;
  definitionIdx: number;
  characterType: CharacterType;
}): ClippyCharacterData {
  const rawDefinitionsData = definitionLookup(text);
  const definitionsData = filterDefinitionsData({
    rawDefinitionsData,
    limit: 10,
  });
  const simplified = definitionsData?.[0]?.simplified ?? null;
  // if the selected characterType is traditional, its definitionData.simplified
  // will be the same as definitionData.traditional so we can take any traditional
  // definition
  const traditional =
    definitionsData
      .map((data) => data.traditional)
      .find((char) =>
        characterType === CharacterType.Simplified ? char != simplified : true
      ) ?? null;
  const decomposeData = decomposeCharacterToRadicals(
    (characterType === CharacterType.Simplified ? simplified : traditional) ??
      ""
  );
  const character = decomposeData.character;
  const radicalComponents =
    decomposeData.components
      .filter((component) => component !== "No glyph available")
      .map((component) => ({
        component,
        meaning: getRadicalMeaning(component),
      })) ?? [];
  const examples =
    getExampleUsages(character)?.map((exampleData) =>
      filterDefinitionsData({ rawDefinitionsData: exampleData, limit: 3 })
    ) ?? [];
  const [highFreqExamples, mediumFreqExamples] = examples;
  return {
    simplified,
    traditional,
    definitionsData,
    definitionIdx,
    radicalComponents,
    highFreqExamples,
    mediumFreqExamples,
  };
}

export function getCharacterPrimaryAndAlternate({
  traditional,
  simplified,
  characterType,
}: {
  traditional: string | null;
  simplified: string | null;
  characterType: CharacterType;
}) {
  let characterPrimary, characterAlternate;
  switch (characterType) {
    case CharacterType.Simplified:
      characterPrimary = simplified;
      characterAlternate = traditional;
      break;
    case CharacterType.Traditional:
      characterPrimary = traditional;
      characterAlternate = simplified;
      break;
  }
  return { characterPrimary, characterAlternate };
}
