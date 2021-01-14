import React from "react";
import PropTypes from "prop-types";

import CharacterWithVariation from "./CharacterWithVariation.react";

function SavedCharacterList({ charactersData, handleRemove, handleExport }) {
  return (
    <>
      <h3>Saved Characters</h3>
      <ul>
        {charactersData.map(({ simplified, traditional }, idx) => {
          return (
            <li key={idx}>
              <CharacterWithVariation
                simplified={simplified}
                traditional={traditional}
              />
              <button onClick={() => handleRemove(idx)}>X</button>
            </li>
          );
        })}
      </ul>
      <button onClick={handleExport}>Export as CSV</button>
    </>
  );
}

SavedCharacterList.propTypes = {
  charactersData: PropTypes.arrayOf(
    PropTypes.shape({
      simplified: PropTypes.string,
      traditional: PropTypes.string,
      definitionData: PropTypes.shape({
        definition: PropTypes.string,
        pinyin: PropTypes.string,
        simplified: PropTypes.string,
        traditional: PropTypes.string,
      }),
      basicComponents: PropTypes.arrayOf(
        PropTypes.shape({
          component: PropTypes.string,
          meaning: PropTypes.string,
        })
      ),
      radicalComponents: PropTypes.arrayOf(
        PropTypes.shape({
          component: PropTypes.string,
          meaning: PropTypes.string,
        })
      ),
    })
  ),
  handleRemove: PropTypes.func.isRequired,
  handleExport: PropTypes.func.isRequired,
};

export default SavedCharacterList;
