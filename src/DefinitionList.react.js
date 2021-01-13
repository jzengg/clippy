import React from "react";
import PropTypes from "prop-types";

function DefinitionList({ definitions }) {
  return (
    <ol>
      {definitions.map((definitionData, idx) => {
        return (
          <li key={idx}>
            {definitionData.pinyin} - {definitionData.definition}
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
};

export default DefinitionList;
