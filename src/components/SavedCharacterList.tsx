import React from "react";
import { ClippyCharacterData } from "../types/interfaces";

import CharacterWithVariation from "./CharacterWithVariation";
import { downloadCharactersData } from "../lib/export";

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
  function downloadFile() {
    downloadCharactersData(charactersData);
  }
  function handleClickChar(char: string, idx: number) {
    setSelectedText(char);
    setSelectedDefinitionIdx(idx);
  }
  return (
    <div className="sticky">
      <h3 className="saved-characters-header">Saved</h3>
      <div className="saved-characters-container">
        {charactersData.map(
          ({ simplified, traditional, definitionIdx }, idx) => {
            const classNames = ["saved-character-item", "hoverable"];
            if (simplified === selectedText) {
              classNames.push("saved-character-highlighted");
            }
            const className = classNames.join(" ");
            return (
              <div key={idx} className="saved-character-row">
                <span
                  onClick={() => handleClickChar(simplified, definitionIdx)}
                  className={className}
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
