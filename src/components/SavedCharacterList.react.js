import React from "react";
import PropTypes from "prop-types";

function SavedCharacterList({ characters, handleRemove }) {
  return (
    <ul>
      {characters.map((character, idx) => {
        return (
          <li key={idx}>
            {character}
            <button onClick={() => handleRemove(idx)}>X</button>
          </li>
        );
      })}
    </ul>
  );
}

SavedCharacterList.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.string),
  handleRemove: PropTypes.func.isRequired,
};

export default SavedCharacterList;
