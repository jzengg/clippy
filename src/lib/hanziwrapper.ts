import hanzi from "hanzi";
import pinyinize from "pinyinize";

import {
  DecomposeData,
  DefinitionData,
  ClippyCharacterData,
} from "../types/interfaces";

export function getRadicalMeaning(character: string): string {
  return hanzi.getRadicalMeaning(character);
}

export function decomposeCharacter(character: string): DecomposeData {
  return hanzi.decompose(character);
}

export function definitionLookup(character: string): DefinitionData[] | null {
  return hanzi.definitionLookup(character) ?? null;
}

export function getExampleUsages(
  character: string
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

export function getCharacterData(
  text: string,
  definitionIdx: number
): ClippyCharacterData {
  const decomposeData = decomposeCharacter(text);
  const character = decomposeData.character;
  const radicalComponents =
    decomposeData?.components2
      .filter((component) => component !== "No glyph available")
      .map((component) => ({
        component,
        meaning: getRadicalMeaning(component),
      })) ?? [];
  const rawDefinitionsData = definitionLookup(text);
  const definitionsData = filterDefinitionsData({
    rawDefinitionsData,
    limit: 10,
  });
  const simplified = definitionsData?.[0]?.simplified ?? null;
  const traditional =
    definitionsData
      .map((data) => data.traditional)
      .find((char) => char != simplified) ?? null;
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
