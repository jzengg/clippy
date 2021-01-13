import React from "react";
import PropTypes from "prop-types";

function SavedCharacterList({ charactersData, handleRemove, handleExport }) {
  return (
    <>
      <h3>Saved Characters</h3>
      <ul>
        {charactersData.map(({ character }, idx) => {
          return (
            <li key={idx}>
              {character}
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
      character: PropTypes.string,
    })
  ),
  handleRemove: PropTypes.func.isRequired,
  handleExport: PropTypes.func.isRequired,
};

export default SavedCharacterList;
