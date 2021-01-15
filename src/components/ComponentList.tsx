import React from "react";
import { getRadicalMeaning } from "../lib/hanziwrapper";
import { ComponentData } from "../types/interfaces";

type Props = {
  components: ComponentData[];
};

function ComponentList({ components }: Props) {
  return (
    <div className="component-container">
      {components.map(({ component, meaning }, idx) => {
        return (
          <React.Fragment key={idx}>
            <span className="red">{component}</span>
            <span className="radical-meaning">
              {meaning != "N/A" && `(${meaning})`}
              {idx != components.length - 1 && ", "}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ComponentList;
