import React from "react";
import PropTypes from "prop-types";

function DefinitionList({
  definitions,
  selectedDefinitionIdx,
  handleSelectDefinition,
}) {
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

DefinitionList.propTypes = {
  definitions: PropTypes.arrayOf(
    PropTypes.shape({
      definition: PropTypes.string,
      pinyin: PropTypes.string,
    })
  ),
  handleSelectDefinition: PropTypes.func.isRequired,
  selectedDefinitionIdx: PropTypes.number,
};

export default DefinitionList;
