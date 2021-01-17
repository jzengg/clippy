import React from "react";
import { DefinitionData } from "../types/interfaces";

type Props = {
  definitions: DefinitionData[];
  handleSelectDefinition: (e: React.BaseSyntheticEvent) => void;
  selectedDefinitionIdx: number;
};

function DefinitionList({
  definitions,
  selectedDefinitionIdx,
  handleSelectDefinition,
}: Props) {
  return (
    <div className="definition-container" data-cy="definition-list">
      {definitions.map((definitionData, idx) => {
        return (
          <div className="definition-row" key={idx}>
            <label>
              <input
                onChange={handleSelectDefinition}
                checked={selectedDefinitionIdx === idx}
                type="radio"
                value={idx}
                className="selected-definition"
              />
              {`${definitionData.pinyin} - ${definitionData.definition}`}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default DefinitionList;
