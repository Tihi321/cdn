import { get } from "lodash";
import { TApi } from "src/types/api";

export const cleanFilterDuplicates = (wordsData: TApi) => {
  const words = get(wordsData, ["data"]) as Array<string>;

  return words.filter((value, index) => words.indexOf(value) === index);
};

export const splitWordsUp = (wordsData: TApi) => {
  const words = get(wordsData, ["data"]) as Array<string>;

  // split workds array with limit of 400 into array of arrays
  const wordsArray = [];
  let tempArray = [];
  for (let i = 0; i < words.length; i++) {
    tempArray.push(words[i]);
    if (tempArray.length === 3000) {
      wordsArray.push(tempArray);
      tempArray = [];
    }
  }

  return wordsArray;
};
