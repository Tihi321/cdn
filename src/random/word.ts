import get from "lodash/get";
import vocabularyEngWords from "../../api/vocabulary-words-eng.json";
import vocabularyCroWords from "../../api/vocabulary-words-cro.json";
import engWords from "../../api/words-eng.json";
import croWords from "../../api/words-cro.json";
import engDetailsWords from "../../api/words-details-eng.json";
import croDetailsWords from "../../api/words-details-cro.json";
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

export const generateRandomDetailsEngWord = () => {
  const JSONData = engDetailsWords as TApi;
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
