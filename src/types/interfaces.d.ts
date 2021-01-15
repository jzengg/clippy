export interface DefinitionData {
  simplified: string;
  traditional: string | null;
  definition: string;
  pinyin: string;
}

export interface ComponentData {
  component: string;
  meaning: string;
}

export interface SavedCharacterData {
  simplified: string;
  traditional: string | null;
  definitionsData: DefinitionData[];
  definitionIdx: number;
  basicComponents: ComponentData[];
  radicalComponents: ComponentData[];
  highFreqExamples: DefinitionData[];
  mediumFreqExamples: DefinitionData[];
}

export interface DecomposeData {
  character: string;
  components1: string[];
  components2: string[];
}
