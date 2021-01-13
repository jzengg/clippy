import React from "react";
import PropTypes from "prop-types";
import hanzi from "hanzi";

function ComponentList({ components }) {
  return (
    <>
      {components.map((component, idx) => {
        const meaning = hanzi.getRadicalMeaning(component);
        return (
          <>
            <span key={idx} className="red">
              {component}
            </span>
            {meaning != "N/A" && `(${meaning})`}
            {idx != components.length - 1 && ", "}
          </>
        );
      })}
    </>
  );
}

ComponentList.propTypes = {
  components: PropTypes.arrayOf(PropTypes.string),
};

export default ComponentList;
