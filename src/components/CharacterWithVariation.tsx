import React from "react";

type Props = {
  simplified: string | null;
  traditional: string | null;
};
function CharacterWithVariation({ simplified, traditional }: Props) {
  return (
    <>
      {simplified}
      {simplified != traditional && traditional != null && `(${traditional})`}
    </>
  );
}

export default CharacterWithVariation;
