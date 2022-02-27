import { readFile } from "fs";
import filter from "lodash/filter";
import map from "lodash/map";
import get from "lodash/get";
import isNaN from "lodash/isNaN";
import includes from "lodash/includes";
import lowerCase from "lodash/lowerCase";
import uniqBy from "lodash/uniqBy";
import isEqual from "lodash/isEqual";
import { saveToDisk } from "../write";

export const getCroatianWordsArray = (words: string) => {
  const dataRowsArray = filter(words.split(/\r|\n/), (row) => !isEqual(row, ""));
  const dataInfoArray = map(dataRowsArray, (data) =>
    filter(data.split(/(\s+)/), (values) => !includes(values, "\t") && isNaN(Number(values)))
  );

  const infinitiveWords = filter(
    map(dataInfoArray, (values) => ({
      word: lowerCase(values[1]),
      type: values[2],
    })),
    (values) => !isEqual(get(values, "type"), "kratica")
  );

  return map(uniqBy(infinitiveWords, "word"), (values) => get(values, "word"));
};

const readCroatianWordsFromDisk = (filePath: string) =>
  new Promise((resolve) => {
    readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const words = getCroatianWordsArray(data);

      resolve(words);
    });
  });

export const saveCroatianJSONFromTXT = () => {
  readCroatianWordsFromDisk("./assets/text/rijeci.txt").then((res) => {
    const wordsString = JSON.stringify({
      data: res,
    });
    saveToDisk("api/words-cro.json", wordsString);
  });
};
