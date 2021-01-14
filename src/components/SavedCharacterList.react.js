import React from "react";
import PropTypes from "prop-types";

import CharacterWithVariation from "./CharacterWithVariation.react";

function SavedCharacterList({ charactersData, handleRemove }) {
  const [exportData, setExportData] = React.useState(null);

  const prepareDownload = () => {
    setExportData(exportSavedCharactersToCSV());
  };
  const getDownloadURL = () => {
    const blob = new Blob([exportData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const getComponentsText = (components) => {
    return components
      .map(
        ({ component, meaning }) =>
          `${component}${meaning != null && meaning != "" && ` (${meaning})`}`
      )
      .join("; ");
  };
  const getExampleTexts = (examples) => {
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
  };

  const exportSavedCharactersToCSV = () => {
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
  };

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

SavedCharacterList.propTypes = {
  charactersData: PropTypes.arrayOf(
    PropTypes.shape({
      simplified: PropTypes.string,
      traditional: PropTypes.string,
      definitionData: PropTypes.shape({
        definition: PropTypes.string,
        pinyin: PropTypes.string,
        simplified: PropTypes.string,
        traditional: PropTypes.string,
      }),
      basicComponents: PropTypes.arrayOf(
        PropTypes.shape({
          component: PropTypes.string,
          meaning: PropTypes.string,
        })
      ),
      radicalComponents: PropTypes.arrayOf(
        PropTypes.shape({
          component: PropTypes.string,
          meaning: PropTypes.string,
        })
      ),
      examples: PropTypes.arrayOf(
        PropTypes.shape({
          traditional: PropTypes.string,
          simplified: PropTypes.string,
          pinyin: PropTypes.string,
          definition: PropTypes.string,
        })
      ),
    })
  ),
  handleRemove: PropTypes.func.isRequired,
};

export default SavedCharacterList;
