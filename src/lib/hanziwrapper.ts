import hanzi from "hanzi";
import {
  DecomposeData,
  DefinitionData,
  SavedCharacterData,
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

export function getSavedCharacterData(
  text: string,
  definitionIdx: number
): SavedCharacterData {
  const decomposeData = decomposeCharacter(text);
  const character = decomposeData.character;
  const basicComponents = (decomposeData?.components1 ?? []).filter(
    (component) => component !== "No glyph available"
  );
  const radicalComponents = (decomposeData?.components2 ?? []).filter(
    (component) => component !== "No glyph available"
  );
  // filter out random duplicates
  const rawDefinitionsData = definitionLookup(text) || [];
  const definitionsData: DefinitionData[] = [];
  const seenDefinitions = new Set();
  rawDefinitionsData.slice(0, 10).forEach((definitionData) => {
    if (!seenDefinitions.has(definitionData.definition)) {
      definitionsData.push(definitionData);
    } else {
      seenDefinitions.add(definitionData.definition);
    }
  });
  const simplified = definitionsData?.[0]?.simplified;
  const traditional =
    definitionsData
      .map((data) => data.traditional)
      .find((char) => char != simplified) ?? null;
  const examples = getExampleUsages(character);
  const highFreqExamples = examples?.[0]?.slice(0, 3) ?? [];
  const mediumFreqExamples = examples?.[1]?.slice(0, 3) ?? [];
  return {
    simplified,
    traditional,
    definitionsData,
    definitionIdx,
    basicComponents: basicComponents.map((component) => ({
      component,
      meaning: getRadicalMeaning(component),
    })),
    radicalComponents: radicalComponents.map((component) => ({
      component,
      meaning: getRadicalMeaning(component),
    })),
    highFreqExamples,
    mediumFreqExamples,
  };
}
