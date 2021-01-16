import React from "react";
import {
  ComponentData,
  DefinitionData,
  SavedCharacterData,
} from "../types/interfaces";

import CharacterWithVariation from "./CharacterWithVariation";

type Props = {
  charactersData: SavedCharacterData[];
  handleRemove: (idx: number) => void;
  exportData: string | null;
  selectedText: string | null;
  setExportData: (data: string | null) => void;
  setSelectedText: (text: string | null) => void;
  setSelectedDefinitionIdx: (idx: number) => void;
};

function SavedCharacterList({
  charactersData,
  handleRemove,
  exportData,
  selectedText,
  setSelectedText,
  setSelectedDefinitionIdx,
  setExportData,
}: Props) {
  function prepareDownload() {
    setExportData(exportSavedCharactersToCSV());
  }
  function getDownloadURL(data: string) {
    const blob = new Blob([data], { type: "text/tsv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    return url;
  }
  function getComponentsText(components: ComponentData[]) {
    return components
      .map(
        ({ component, meaning }) =>
          `${component}${meaning != null && meaning != "" && ` (${meaning})`}`
      )
      .join("; ");
  }
  function getExampleTexts(examples: DefinitionData[]) {
    return examples
      .slice(0, 3)
      .map(
        ({ traditional, simplified, pinyin, definition }) =>
          `${simplified}${
            traditional != null && traditional != simplified
              ? ` (${traditional})`
              : ""
          } ${pinyin} - ${definition}`
      );
  }

  function exportSavedCharactersToCSV() {
    const csv = charactersData.map(
      ({
        simplified,
        traditional,
        definitionsData,
        definitionIdx,
        basicComponents,
        radicalComponents,
        highFreqExamples,
        mediumFreqExamples,
      }) => {
        const radicalComponentsText = getComponentsText(radicalComponents);
        const basicComponentsText = getComponentsText(basicComponents);
        const definitionData = definitionsData[definitionIdx];
        const { definition, pinyin } = definitionData;
        const examples = [...highFreqExamples, ...mediumFreqExamples];
        const exampleTexts = getExampleTexts(examples);
        return [
          simplified,
          pinyin,
          definition,
          traditional,
          basicComponentsText,
          radicalComponentsText,
          ...exampleTexts,
        ].join("\t");
      }
    );
    return csv.join("\n");
  }

  function handleClickChar(char: string, idx: number) {
    setSelectedText(char);
    setSelectedDefinitionIdx(idx);
  }

  return (
    <div className="sticky">
      <h3 className="saved-characters-header">Saved Characters</h3>
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
          <button className="prepare-download-button" onClick={prepareDownload}>
            Export
          </button>
        </>
      )}
      {exportData != null && (
        <a
          href={getDownloadURL(exportData)}
          download={`clippy_export_${new Date().getTime()}.tsv`}
        >
          Download
        </a>
      )}
    </div>
  );
}

export default SavedCharacterList;
