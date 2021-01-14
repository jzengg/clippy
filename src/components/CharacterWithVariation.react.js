import React from "react";
import PropTypes from "prop-types";

function CharacterWithVariation({ simplified, traditional }) {
  return (
    <>
      {simplified}
      {simplified != traditional && traditional != null && `(${traditional})`}
    </>
  );
}

CharacterWithVariation.propTypes = {
  simplified: PropTypes.string,
  traditional: PropTypes.string,
};

export default CharacterWithVariation;
