import React from "react";
import { useRecoilValue } from "recoil";
import { clippyCharacterType } from "atoms/clippyCharacterType";
import { getCharacterPrimaryAndAlternate } from "lib/hanziwrapper";

type Props = {
  simplified: string | null;
  traditional: string | null;
};
function CharacterWithVariation({ simplified, traditional }: Props) {
  const characterType = useRecoilValue(clippyCharacterType);
  const {
    characterPrimary,
    characterAlternate,
  } = getCharacterPrimaryAndAlternate({
    simplified,
    traditional,
    characterType,
  });
  return (
    <>
      {characterPrimary}
      {characterPrimary != characterAlternate &&
        characterAlternate != null &&
        `(${characterAlternate})`}
    </>
  );
}

export default CharacterWithVariation;
