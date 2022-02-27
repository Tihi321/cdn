import { readFile } from "fs";
import filter from "lodash/filter";
import map from "lodash/map";
import get from "lodash/get";
import isNaN from "lodash/isNaN";
import includes from "lodash/includes";
import uniqBy from "lodash/uniqBy";
import isEqual from "lodash/isEqual";
import { saveToDisk } from "../write";

const readCroatianWordsFromDisk = (filePath: string): Promise<string> =>
  new Promise((resolve) => {
    readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      resolve(data);
    });
  });

const getCroatianWordsArray = (words: string) => {
  const dataRowsArray = filter(words.split(/\r|\n/), (row) => !isEqual(row, ""));

  const dataInfoArray = map(dataRowsArray, (data) =>
    filter(data.split(/(\s+)/), (values) => !includes(values, "\t") && isNaN(Number(values)))
  );

  const infinitiveWords = filter(
    map(dataInfoArray, (values) => ({
      word: values[1].toLowerCase(),
      type: values[2],
    })),
    (values) => !isEqual(get(values, "type"), "kratica") && !includes(get(values, "word"), "-")
  );

  return uniqBy(infinitiveWords, "word");
};

const getCroatianOlyWordsArray = (words: string) =>
  map(getCroatianWordsArray(words), (values) => get(values, "word"));

export const saveCroatianJSONFromTXT = () => {
  readCroatianWordsFromDisk("./assets/text/rijeci.txt").then((res) => {
    const onlyWords = getCroatianOlyWordsArray(res);
    const wordsString = JSON.stringify({
      data: onlyWords,
    });
    saveToDisk("api/words-cro.json", wordsString);
  });
};

export const saveCroatianDetailsJSONFromTXT = () => {
  readCroatianWordsFromDisk("./assets/text/rijeci.txt").then((res) => {
    const words = getCroatianWordsArray(res);
    const wordsString = JSON.stringify({
      data: words,
    });
    saveToDisk("api/words-cro-details.json", wordsString);
  });
};
