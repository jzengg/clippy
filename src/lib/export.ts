import {
  ComponentData,
  DefinitionData,
  SavedCharacterData,
} from "../types/interfaces";

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

function exportSavedCharactersToTSV(charactersData: SavedCharacterData[]) {
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

export function downloadSavedCharacters(charactersData: SavedCharacterData[]) {
  const data = exportSavedCharactersToTSV(charactersData);
  const filename = `clippy_export_${new Date().getTime()}.tsv`;
  const blob = new Blob([data], { type: "text/tsv;charset=utf-8;" });
  const blobURL =
    window.URL && window.URL.createObjectURL
      ? window.URL.createObjectURL(blob)
      : window.webkitURL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = blobURL;
  tempLink.setAttribute("download", filename);

  // Safari thinks _blank anchor are pop ups. We only want to set _blank
  // target if the browser does not support the HTML5 download attribute.
  // This allows you to download files in desktop safari if pop up blocking
  // is enabled.
  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }

  document.body.appendChild(tempLink);
  tempLink.click();

  // Fixes "webkit blob resource error 1"
  setTimeout(function () {
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }, 200);
}
