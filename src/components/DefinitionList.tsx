import React from "react";
import { DefinitionData } from "../types/interfaces";

type Props = {
  definitions: DefinitionData[];
  handleSelectDefinition: (idx: number) => void;
  selectedDefinitionIdx: number;
};

function DefinitionList({
  definitions,
  selectedDefinitionIdx,
  handleSelectDefinition,
}: Props) {
  return (
    <ol>
      {definitions.map((definitionData, idx) => {
        return (
          <li onClick={() => handleSelectDefinition(idx)} key={idx}>
            {definitionData.pinyin} - {definitionData.definition}
            {selectedDefinitionIdx === idx && " Selected"}
          </li>
        );
      })}
    </ol>
  );
}

export default DefinitionList;
