import React from "react";
import PropTypes from "prop-types";
import hanzi from "hanzi";

function ComponentList({ components }) {
  return (
    <>
      {components.map((component, idx) => {
        const meaning = hanzi.getRadicalMeaning(component);
        return (
          <React.Fragment key={idx}>
            <span key={idx} className="red">
              {component}
            </span>
            {meaning != "N/A" && `(${meaning})`}
            {idx != components.length - 1 && ", "}
          </React.Fragment>
        );
      })}
    </>
  );
}

ComponentList.propTypes = {
  components: PropTypes.arrayOf(PropTypes.string),
};

export default ComponentList;
