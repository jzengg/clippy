import React from "react";
import { DefinitionData } from "../types/interfaces";
import CharacterWithVariation from "./CharacterWithVariation";

type Props = {
  examples: DefinitionData[];
};

function ExampleWordList({ examples }: Props) {
  return (
    <ol>
      {examples.map((example, idx) => {
        return (
          <li key={idx}>
            <CharacterWithVariation
              simplified={example.simplified}
              traditional={example.traditional}
            />{" "}
            {example.pinyin} - {example.definition}
          </li>
        );
      })}
    </ol>
  );
}

export default ExampleWordList;
