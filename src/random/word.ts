import get from "lodash/get";
import words from "../../assets/api/random-vocabulary-words.json";
import croatianWords from "../../assets/api/random-vocabulary-words-hr.json";
import { getRandomArrayIndex } from "../utils/array";

export const generateRandomWord = () => {
  const itemIdex = getRandomArrayIndex(words.data);

  return JSON.stringify(get(words.data, itemIdex));
};

export const generateRandomWordCroatian = () => {
  const itemIdex = getRandomArrayIndex(croatianWords.data);

  return JSON.stringify(get(croatianWords.data, itemIdex));
};
