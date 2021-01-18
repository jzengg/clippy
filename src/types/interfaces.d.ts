export interface DefinitionData {
  simplified: string | null;
  traditional: string | null;
  definition: string;
  pinyin: string;
}

export interface ComponentData {
  component: string;
  meaning: string;
}

export interface ClippyCharacterData {
  simplified: string | null;
  traditional: string | null;
  definitionsData: DefinitionData[];
  definitionIdx: number;
  radicalComponents: ComponentData[];
  highFreqExamples: DefinitionData[];
  mediumFreqExamples: DefinitionData[];
}

export interface RadicalDecompositionData {
  character: string;
  components: string[];
}
