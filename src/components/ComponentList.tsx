import React from "react";
import { ComponentData } from "types/interfaces";
import { Text } from "@chakra-ui/react";

type Props = {
  components: ComponentData[];
};

function ComponentList({ components }: Props) {
  return (
    <div className="component-container">
      {components.map(({ component, meaning }, idx) => {
        return (
          <React.Fragment key={idx}>
            <Text as="span" color="red.600" mr={1}>
              {component}
            </Text>
            <Text className="radical-meaning" as="span">
              {meaning != "N/A" && `(${meaning})`}
              {idx != components.length - 1 && ", "}
            </Text>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ComponentList;
