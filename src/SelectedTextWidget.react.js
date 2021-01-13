import React from "react";
import PropTypes from "prop-types";
import hanzi from "hanzi";
import ExampleWordList from "./ExampleWordList.react";
import ComponentList from "./ComponentList.react";
import DefinitionList from "./DefinitionList.react";

function SelectedTextWidget({ selectedText }) {
  const decomposeData = hanzi.decompose(selectedText);
  const character = decomposeData.character;
  const basicComponents = (decomposeData?.components1 ?? []).filter(
    (component) => component !== "No glyph available"
  );
  const radicalComponents = (decomposeData?.components2 ?? []).filter(
    (component) => component !== "No glyph available"
  );
  // filter out random duplicates
  const definitionsData = (
    hanzi.definitionLookup(selectedText)?.slice(0, 10) ?? []
  ).reduce((acc, current) => {
    if (!acc.some((x) => x?.definition === current?.definition)) {
      acc.push(current);
    }
    return acc;
  }, []);
  // show high frequency examples with their pinyin and meaning?
  // update layout so we can show list of chars to save, should be backed up to local storage until cleared?
  // have a list of characters to save. button to export to csv. ui to select export format? checkboxes to select which columns to export?
  const simplified = definitionsData?.[0]?.simplified;
  const traditional = definitionsData
    .map((data) => data.traditional)
    .find((char) => char != simplified);
  const examples = hanzi.getExamples(character);
  const highFreqExamples = examples?.[0]?.slice(0, 3) ?? [];
  const mediumFreqExamples = examples?.[1]?.slice(0, 3) ?? [];
  return (
    <>
      <h3>
        Character: {character}
        {traditional != null &&
          traditional !== simplified &&
          `(${traditional})`}
      </h3>
      <h3>
        Basic <ComponentList components={basicComponents} />
      </h3>
      <h3>
        Radicals <ComponentList components={radicalComponents} />
      </h3>
      <h3>Pinyin & Meaning</h3>
      <DefinitionList definitions={definitionsData} />
      <h3>Example Words</h3>
      <h4>High Frequency</h4>
      <ExampleWordList examples={highFreqExamples} />
      <h4>Medium Frequency</h4>
      <ExampleWordList examples={mediumFreqExamples} />
    </>
  );
}

SelectedTextWidget.propTypes = {
  selectedText: PropTypes.string,
};

export default SelectedTextWidget;
