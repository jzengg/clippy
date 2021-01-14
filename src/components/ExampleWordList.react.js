import React from "react";
import PropTypes from "prop-types";

import CharacterWithVariation from "./CharacterWithVariation.react";

function ExampleWordList({ examples }) {
  return (
    <ol>
      {examples.map((example, idx) => {
        return (
          <li key={idx}>
            <CharacterWithVariation
              simplified={example.simplified}
              traditional={example.traditional}
            />{" "}
            {example.pinyin} - {example.definition}
          </li>
        );
      })}
    </ol>
  );
}

ExampleWordList.propTypes = {
  examples: PropTypes.arrayOf(
    PropTypes.shape({
      traditional: PropTypes.string,
      simplified: PropTypes.string,
      definition: PropTypes.string,
      pinyin: PropTypes.string,
    })
  ),
};

export default ExampleWordList;
