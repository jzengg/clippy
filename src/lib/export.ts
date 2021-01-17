import {
  ComponentData,
  DefinitionData,
  ClippyCharacterData,
} from "../types/interfaces";

const DELIMITER = "\t";

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

function convertCharactersDataToTSV(charactersData: ClippyCharacterData[]) {
  const characterRows = charactersData.map(
    ({
      simplified,
      traditional,
      definitionsData,
      definitionIdx,
      radicalComponents,
      highFreqExamples,
      mediumFreqExamples,
    }) => {
      const radicalComponentsText = getComponentsText(radicalComponents);
      const definitionData = definitionsData[definitionIdx];
      const { definition, pinyin } = definitionData;
      const examples = [...highFreqExamples, ...mediumFreqExamples];
      const exampleTexts = getExampleTexts(examples);
      return [
        simplified,
        pinyin,
        definition,
        traditional,
        radicalComponentsText,
        ...exampleTexts,
      ].join(DELIMITER);
    }
  );
  const header = [
    "#",
    "simplified",
    "pinyin",
    "definition",
    "traditional",
    "radical components",
    "example1",
    "example2",
    "example3",
  ].join(DELIMITER);
  const rows = [header, ...characterRows];
  return rows.join("\n");
}

// impl cribbed from https://github.com/kennethjiang/js-file-download
export function downloadCharactersData(charactersData: ClippyCharacterData[]) {
  const data = convertCharactersDataToTSV(charactersData);
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
