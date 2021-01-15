import React from "react";
import { DefinitionData } from "../types/interfaces";
import CharacterWithVariation from "./CharacterWithVariation";

type Props = {
  examples: DefinitionData[];
};

function ExampleWordList({ examples }: Props) {
  return (
    <div className="example-character-container">
      {examples.map((example, idx) => {
        return (
          <div className="example-character-row" key={idx}>
            <span className="example-character">
              <CharacterWithVariation
                simplified={example.simplified}
                traditional={example.traditional}
              />
            </span>
            {example.pinyin} - {example.definition}
          </div>
        );
      })}
    </div>
  );
}

export default ExampleWordList;
