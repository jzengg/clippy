import React from "react";
import { Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <div className="header">
      <Heading p={2} size="lg" color="red.600" as="h1">
        Clippy
      </Heading>
    </div>
  );
}
