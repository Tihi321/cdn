import get from "lodash/get";
import vocabularyEngWords from "../../assets/api/vocabulary-words-eng.json";
import vocabularyCroWords from "../../assets/api/vocabulary-words-cro.json";
import engWords from "../../assets/api/words-eng.json";
import croWords from "../../assets/api/words-cro.json";
import croDetailsWords from "../../assets/api/words-details-cro.json";
import { getRandomArrayIndex } from "../utils/array";

import { TApi } from "../types/api";

export const generateRandomVocabularyEngWord = () => {
  const JSONData = vocabularyEngWords as TApi;
  const itemIdex = getRandomArrayIndex(JSONData.data);

  return JSON.stringify({
    data: get(JSONData.data, itemIdex),
  });
};

export const generateRandomVocabularyCroWord = () => {
  const JSONData = vocabularyCroWords as TApi;
  const itemIdex = getRandomArrayIndex(JSONData.data);

  return JSON.stringify({
    data: get(JSONData.data, itemIdex),
  });
};

export const generateRandomEngWord = () => {
  const JSONData = engWords as TApi;
  const itemIdex = getRandomArrayIndex(JSONData.data);

  return JSON.stringify({
    data: get(JSONData.data, itemIdex),
  });
};

export const generateRandomCroWord = () => {
  const JSONData = croWords as TApi;
  const itemIdex = getRandomArrayIndex(JSONData.data);

  return JSON.stringify({
    data: get(JSONData.data, itemIdex),
  });
};

export const generateRandomDetailsCroWord = () => {
  const JSONData = croDetailsWords as TApi;
  const itemIdex = getRandomArrayIndex(JSONData.data);

  return JSON.stringify({
    data: get(JSONData.data, itemIdex),
  });
};
