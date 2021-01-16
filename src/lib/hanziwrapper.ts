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

export function definitionLookup(character: string): DefinitionData[] {
  return hanzi.definitionLookup(character);
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

export function getCharacterData(
  text: string,
  definitionIdx: number
): ClippyCharacterData {
  const decomposeData = decomposeCharacter(text);
  const character = decomposeData.character;
  const basicComponents = (decomposeData?.components1 ?? [])
    .filter((component) => component !== "No glyph available")
    .map((component) => ({ component, meaning: getRadicalMeaning(component) }));
  const radicalComponents = (decomposeData?.components2 ?? [])
    .filter((component) => component !== "No glyph available")
    .map((component) => ({ component, meaning: getRadicalMeaning(component) }));
  // filter out random duplicates
  const rawDefinitionsData = definitionLookup(text) || [];
  const definitionsData: DefinitionData[] = [];
  const seenDefinitions = new Set();
  rawDefinitionsData.slice(0, 10).forEach((definitionData) => {
    if (!seenDefinitions.has(definitionData.definition)) {
      definitionsData.push(cleanDefinitionData(definitionData));
    } else {
      seenDefinitions.add(definitionData.definition);
    }
  });
  const simplified = definitionsData?.[0]?.simplified;
  const traditional =
    definitionsData
      .map((data) => data.traditional)
      .find((char) => char != simplified) ?? null;
  const examples = getExampleUsages(character)?.map(
    (exampleData) =>
      exampleData
        ?.slice(0, 3)
        ?.map((example) => cleanDefinitionData(example)) ?? []
  );
  const [highFreqExamples, mediumFreqExamples] = examples;
  return {
    simplified,
    traditional,
    definitionsData,
    definitionIdx,
    basicComponents,
    radicalComponents,
    highFreqExamples,
    mediumFreqExamples,
  };
}
