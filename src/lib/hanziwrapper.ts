import hanzi from "hanzi";
import { DecomposeData, DefinitionData } from "../types/interfaces";

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
