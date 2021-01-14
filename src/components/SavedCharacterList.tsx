import React from "react";
import {
  CharacterData,
  ComponentData,
  DefinitionData,
} from "../types/interfaces";

import CharacterWithVariation from "./CharacterWithVariation";

type Props = {
  charactersData: CharacterData[];
  handleRemove: (idx: number) => void;
};

function SavedCharacterList({ charactersData, handleRemove }: Props) {
  const [exportData, setExportData] = React.useState<string | null>(null);

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
    <>
      <h3>Saved Characters</h3>
      <ul>
        {charactersData.map(({ simplified, traditional }, idx) => {
          return (
            <li key={idx}>
              <CharacterWithVariation
                simplified={simplified}
                traditional={traditional}
              />
              <button onClick={() => handleRemove(idx)}>X</button>
            </li>
          );
        })}
      </ul>
      {charactersData != null && charactersData.length > 0 && (
        <button onClick={prepareDownload}>Get Download Link</button>
      )}
      {exportData != null && (
        <a
          href={getDownloadURL(exportData)}
          download={`clippy_export_${new Date().getTime()}.csv`}
        >
          Download
        </a>
      )}
    </>
  );
}

export default SavedCharacterList;
