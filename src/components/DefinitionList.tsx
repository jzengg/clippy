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
    <div className="definition-container">
      {definitions.map((definitionData, idx) => {
        const content = `${definitionData.pinyin} - ${definitionData.definition}`;
        return (
          <div
            className="definition-row"
            onClick={() => handleSelectDefinition(idx)}
            key={idx}
          >
            {selectedDefinitionIdx === idx ? (
              <div className="selected-definition">{content}</div>
            ) : (
              content
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DefinitionList;
