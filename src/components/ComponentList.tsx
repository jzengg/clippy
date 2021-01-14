import React from "react";
import { getRadicalMeaning } from "../lib/hanziwrapper";

type Props = {
  components: string[];
};

function ComponentList({ components }: Props) {
  return (
    <>
      {components.map((component, idx) => {
        const meaning = getRadicalMeaning(component);
        return (
          <React.Fragment key={idx}>
            <span className="red">{component}</span>
            {meaning != "N/A" && `(${meaning})`}
            {idx != components.length - 1 && ", "}
          </React.Fragment>
        );
      })}
    </>
  );
}

export default ComponentList;
