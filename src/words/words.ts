import { readFile } from "fs";
import filter from "lodash/filter";
import map from "lodash/map";
import get from "lodash/get";
import isNaN from "lodash/isNaN";
import includes from "lodash/includes";
import uniqBy from "lodash/uniqBy";
import isEqual from "lodash/isEqual";
import { saveToDisk } from "../write";

const readWordsFromDisk = (filePath: string): Promise<string> =>
  new Promise((resolve) => {
    readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      resolve(data);
    });
  });

const getDetailsWordsArray = (words: string) => {
  const dataRowsArray = filter(words.split(/\r|\n/), (row) => !isEqual(row, ""));

  const dataInfoArray = map(dataRowsArray, (data) =>
    filter(data.split(/(\s+)/), (values) => !includes(values, "\t") && isNaN(Number(values)))
  );

  const infinitiveWords = filter(
    map(dataInfoArray, (values) => ({
      word: values[1].toLowerCase(),
      type: values[2],
    })),
    (values) =>
      !isEqual(get(values, "type"), "kratica") &&
      !isEqual(get(values, "type"), "prefiks") &&
      !includes(get(values, "word"), "-")
  );

  return uniqBy(infinitiveWords, "word");
};

const getOlyWordsArray = (words: string) =>
  map(getDetailsWordsArray(words), (values) => get(values, "word"));

const saveJSONFromTXT = (wordsOrigin: string, wordsDestination: string) => {
  readWordsFromDisk(wordsOrigin).then((res) => {
    const onlyWords = getOlyWordsArray(res);
    const wordsString = JSON.stringify({
      data: onlyWords,
    });
    saveToDisk(wordsDestination, wordsString);
  });
};

const saveDetailsJSONFromTXT = (wordsOrigin: string, wordsDestination: string) => {
  readWordsFromDisk(wordsOrigin).then((res) => {
    const words = getDetailsWordsArray(res);
    const wordsString = JSON.stringify({
      data: words,
    });
    saveToDisk(wordsDestination, wordsString);
  });
};

export const saveCroatianJSONFromTXT = () =>
  saveJSONFromTXT("./assets/text/rijeci.txt", "api/words-cro.json");
export const saveCroatianDetailsJSONFromTXT = () =>
  saveDetailsJSONFromTXT("./assets/text/rijeci.txt", "api/words-details-cro.json");

export const saveEnglishJSONFromTXT = () =>
  saveJSONFromTXT("./assets/text/words.txt", "api/words-eng.json");
export const saveEnglishDetailsJSONFromTXT = () =>
  saveDetailsJSONFromTXT("./assets/text/words.txt", "api/words-details-eng.json");
