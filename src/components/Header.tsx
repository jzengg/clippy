import React from "react";
import { Heading } from "@chakra-ui/react";
import packageJson from '../../package.json'

export default function Header() {
  return (
    <div className="header">
      <Heading p={2} size="lg" color="red.600" as="h1" title={packageJson.version}>
        Clippy
      </Heading>
    </div>
  );
}
