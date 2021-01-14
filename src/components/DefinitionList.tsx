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
        const content = `${definitionData.pinyin} - ${definitionData.definition}`;
        return (
          <li onClick={() => handleSelectDefinition(idx)} key={idx}>
            {selectedDefinitionIdx === idx ? <b>{content}</b> : content}
          </li>
        );
      })}
    </ol>
  );
}

export default DefinitionList;
