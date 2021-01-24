import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";
import { DefinitionData } from "types/interfaces";

type Props = {
  definitions: DefinitionData[];
  handleSelectDefinition: (nextValue: React.ReactText) => void;
  selectedDefinitionIdx: number;
};

function DefinitionList({
  definitions,
  selectedDefinitionIdx,
  handleSelectDefinition,
}: Props) {
  return (
    <RadioGroup
      name="selected-definition"
      data-cy="definition-list"
      onChange={handleSelectDefinition}
      value={selectedDefinitionIdx.toString()}
    >
      {definitions.map(({ pinyin, definition }, idx) => (
        <Stack key={idx}>
          <Radio value={idx.toString()}>{`${pinyin} - ${definition}`}</Radio>
        </Stack>
      ))}
    </RadioGroup>
  );
}

export default DefinitionList;
