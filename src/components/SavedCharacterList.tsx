import React from "react";
import { SavedCharacterData } from "../types/interfaces";

import CharacterWithVariation from "./CharacterWithVariation";
import { downloadSavedCharacters } from "../lib/export";

type Props = {
  charactersData: SavedCharacterData[];
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
    downloadSavedCharacters(charactersData);
  }
  function handleClickChar(char: string, idx: number) {
    setSelectedText(char);
    setSelectedDefinitionIdx(idx);
  }
  return (
    <div className="sticky">
      <h3 className="saved-characters-header">Saved</h3>
      {charactersData.length > 0 && (
        <>
          <div className="saved-characters-container">
            {charactersData.map(
              ({ simplified, traditional, definitionIdx }, idx) => {
                return (
                  <div key={idx} className="saved-character-row">
                    <span
                      onClick={() => handleClickChar(simplified, definitionIdx)}
                      className={`saved-character-item${
                        simplified === selectedText
                          ? " saved-character-highlighted"
                          : ""
                      }`}
                    >
                      <CharacterWithVariation
                        simplified={simplified}
                        traditional={traditional}
                      />
                    </span>
                    <button
                      className="remove-saved-character-button"
                      onClick={() => handleRemove(idx)}
                    >
                      X
                    </button>
                  </div>
                );
              }
            )}
          </div>
          <button className="prepare-download-button" onClick={downloadFile}>
            Export
          </button>
        </>
      )}
    </div>
  );
}

export default SavedCharacterList;
