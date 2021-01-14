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

export interface CharacterData {
  simplified: string;
  traditional: string | null;
  definitionData: DefinitionData;
  basicComponents: ComponentData[];
  radicalComponents: ComponentData[];
  examples: DefinitionData[];
}

export interface DecomposeData {
  character: string;
  components1: string[];
  components2: string[];
}
