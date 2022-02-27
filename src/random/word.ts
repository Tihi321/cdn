import get from "lodash/get";
import vocabularyEngWords from "../../assets/api/vocabulary-words-eng.json";
import vocabularyCroWords from "../../assets/api/vocabulary-words-cro.json";
import engWords from "../../assets/api/words-eng.json";
import croWords from "../../assets/api/words-cro.json";
import { getRandomArrayIndex } from "../utils/array";

export const generateRandomVocabularyEngWord = () => {
  const itemIdex = getRandomArrayIndex(vocabularyEngWords.data);

  return JSON.stringify(get(vocabularyEngWords.data, itemIdex));
};

export const generateRandomVocabularyCroWord = () => {
  const itemIdex = getRandomArrayIndex(vocabularyCroWords.data);

  return JSON.stringify(get(vocabularyCroWords.data, itemIdex));
};

export const generateRandomEngWord = () => {
  const itemIdex = getRandomArrayIndex(engWords.data);

  return JSON.stringify(get(engWords.data, itemIdex));
};

export const generateRandomCroWord = () => {
  const itemIdex = getRandomArrayIndex(croWords.data);

  return JSON.stringify(get(croWords.data, itemIdex));
};
