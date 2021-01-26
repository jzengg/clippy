import React from "react";
import { Text } from "@chakra-ui/react";

type Props = {
  text: string;
  title?: string;
};

export default function PlaceholderText({ text, title }: Props) {
  return (
    <div className="sticky">
      {title != null && (
        <Text fontWeight="bold" fontSize="lg">
          {title}
        </Text>
      )}
      <Text>{text}</Text>
    </div>
  );
}
