import React from "react";
import {
  ChineseCharacterData,
  ComponentData,
  DefinitionData,
} from "../types/interfaces";

import CharacterWithVariation from "./CharacterWithVariation";

type Props = {
  charactersData: ChineseCharacterData[];
  handleRemove: (idx: number) => void;
  exportData: string | null;
  setExportData: (data: string | null) => void;
};

function SavedCharacterList({
  charactersData,
  handleRemove,
  exportData,
  setExportData,
}: Props) {
  function prepareDownload() {
    setExportData(exportSavedCharactersToCSV());
  }
  function getDownloadURL(data: string) {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
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
        definitionData: { definition, pinyin },
        basicComponents,
        radicalComponents,
        examples,
      }) => {
        const radicalComponentsText = getComponentsText(radicalComponents);
        const basicComponentsText = getComponentsText(basicComponents);
        const exampleTexts = getExampleTexts(examples);
        return [
          simplified,
          pinyin,
          definition,
          traditional,
          basicComponentsText,
          radicalComponentsText,
          ...exampleTexts,
        ].join(",");
      }
    );
    return csv.join("\n");
  }

  return (
    <div className="sticky">
      <h3 className="saved-characters-header">Saved Characters</h3>
      {charactersData.length > 0 && (
        <>
          <div className="saved-characters-container">
            {charactersData.map(({ simplified, traditional }, idx) => {
              return (
                <div key={idx} className="saved-character-row">
                  <span className="saved-character-item">
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
            })}
          </div>
          <button className="prepare-download-button" onClick={prepareDownload}>
            Export
          </button>
        </>
      )}
      {exportData != null && (
        <a
          href={getDownloadURL(exportData)}
          download={`clippy_export_${new Date().getTime()}.csv`}
        >
          Download
        </a>
      )}
    </div>
  );
}

export default SavedCharacterList;
