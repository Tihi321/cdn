import fs from "fs";
import path from "path";

import engWords from "../../assets/api/words-eng.json";
import croWords from "../../assets/api/words-cro.json";
import engDetailsWords from "../../assets/api/words-details-eng.json";
import croDetailsWords from "../../assets/api/words-details-cro.json";
import vocabularyEngWords from "../../assets/api/vocabulary-words-eng.json";
import vocabularyCroWords from "../../assets/api/vocabulary-words-cro.json";

import { TApi } from "../types/api";
import { cleanFilterDuplicates, splitWordsUp } from "../utils/clean";
import { get } from "lodash";

export const cleanEnglishWordDetails = () => {
  const JSONData = engWords as TApi;
  const JSONDataDetals = engDetailsWords as TApi;
  const words = get(JSONData, ["data"]) as Array<string>;
  const wordDetails = get(JSONDataDetals, ["data"]) as Array<{ word: string; type: string }>;

  const filteredWordDetails = wordDetails.filter((wordDetail) => words.includes(wordDetail.word));

  return {
    data: filteredWordDetails,
  };
};

export const cleanEnglishWordsVovcabulary = () => {
  const JSONData = engWords as TApi;
  const JSONDataDetals = vocabularyEngWords as TApi;
  const words = get(JSONData, ["data"]) as Array<string>;
  const wordDetails = get(JSONDataDetals, ["data"]) as Array<{ name: string; detail: string }>;

  const filteredWordDetails = wordDetails.filter((wordDetail) => words.includes(wordDetail.name));

  return {
    data: filteredWordDetails,
  };
};

export const cleanCroatianWordDetails = () => {
  const JSONData = croWords as TApi;
  const JSONDataDetals = croDetailsWords as TApi;
  const words = get(JSONData, ["data"]) as Array<string>;
  const wordDetails = get(JSONDataDetals, ["data"]) as Array<{ word: string; type: string }>;

  const filteredWordDetails = wordDetails.filter((wordDetail) => words.includes(wordDetail.word));

  return {
    data: filteredWordDetails,
  };
};

export const cleanCroatianWordsVovcabulary = () => {
  const JSONData = croWords as TApi;
  const JSONDataDetals = vocabularyCroWords as TApi;
  const words = get(JSONData, ["data"]) as Array<string>;
  const wordDetails = get(JSONDataDetals, ["data"]) as Array<{ name: string; detail: string }>;

  const filteredWordDetails = wordDetails.filter((wordDetail) => words.includes(wordDetail.name));

  return {
    data: filteredWordDetails,
  };
};

export const cleanEnglishWords = () => {
  const JSONData = engWords as TApi;
  const filteredWords = cleanFilterDuplicates(JSONData);

  return {
    data: filteredWords,
  };
};

export const cleanCroatianWords = () => {
  const JSONData = croWords as TApi;
  const filteredWords = cleanFilterDuplicates(JSONData);

  return { data: filteredWords };
};

export const splitCroWordsUp = () => {
  const JSONData = croWords as TApi;
  return splitWordsUp(JSONData);
};

export const joinWordsUp = (): string => {
  const folderPath = path.resolve(__dirname, "../../assets/api/list");
  const files = fs.readdirSync(folderPath);
  const allWords: string[] = [];

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(fileContent) as TApi;
      allWords.push(...jsonData.data);
    }
  });

  return JSON.stringify({
    data: allWords,
  });
};
