import React from "react";
import { ClippyCharacterData } from "../types/interfaces";

import CharacterWithVariation from "./CharacterWithVariation";
import { downloadCharactersData } from "../lib/export";
import { getCharacterPrimaryAndAlternate } from "src/lib/hanziwrapper";
import { clippyCharacterType } from "src/atoms/clippyCharacterType";
import { useRecoilValue } from "recoil";

type Props = {
  charactersData: ClippyCharacterData[];
  handleRemove: (idx: number) => void;
  selectedText: string | null;
  setSelectedText: (text: string | null) => void;
  setSelectedDefinitionIdx: (idx: number) => void;
};

function SavedCharacterList({
  charactersData,
  handleRemove,
  selectedText,
  setSelectedText,
  setSelectedDefinitionIdx,
}: Props) {
  const characterType = useRecoilValue(clippyCharacterType);
  function downloadFile() {
    downloadCharactersData(charactersData);
  }
  function handleClickChar(char: string | null, idx: number) {
    setSelectedText(char);
    setSelectedDefinitionIdx(idx);
  }
  return (
    <div className="sticky">
      <h3 className="saved-characters-header">Saved</h3>
      <div className="saved-characters-container">
        {charactersData.map(
          ({ simplified, traditional, definitionIdx }, idx) => {
            const { characterPrimary } = getCharacterPrimaryAndAlternate({
              simplified,
              traditional,
              characterType,
            });
            const classNames = ["saved-character-item", "hoverable"];
            if (characterPrimary === selectedText) {
              classNames.push("saved-character-highlighted");
            }
            const className = classNames.join(" ");
            return (
              <div key={idx} className="saved-character-row">
                <span
                  onClick={() =>
                    handleClickChar(characterPrimary, definitionIdx)
                  }
                  className={className}
                  data-cy={`saved-word-${characterPrimary}`}
                >
                  <CharacterWithVariation
                    simplified={simplified}
                    traditional={traditional}
                  />
                </span>
                <button
                  className="remove-saved-character-button hoverable"
                  onClick={() => handleRemove(idx)}
                >
                  X
                </button>
              </div>
            );
          }
        )}
      </div>
      <button
        className="prepare-download-button hoverable"
        onClick={downloadFile}
      >
        Export To TSV
      </button>
    </div>
  );
}

export default SavedCharacterList;
