import { readFile } from "fs";
import filter from "lodash/filter";
import map from "lodash/map";
import get from "lodash/get";
import isNaN from "lodash/isNaN";
import includes from "lodash/includes";
import uniqBy from "lodash/uniqBy";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import { saveToDisk } from "../write";

const getTypeTranslation = (type: string) => {
  switch (type.toLowerCase().trim()) {
    case "imenica":
      return "noun";
    case "pridjev":
      return "adjective";
    case "glagol":
      return "verb";
    case "prilog":
      return "adverb";
    case "zamjenica":
      return "pronoun";
    case "prijedlog":
      return "proposal";
    case "veznik":
      return "conjunction";

    default:
      return "";
  }
};

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
      !isEqual(get(values, "type"), "član") &&
      !isEqual(get(values, "type"), "čestica") &&
      !isEqual(get(values, "type"), "uzvik") &&
      !isEqual(get(values, "type"), "broj") &&
      !isEqual(get(values, "type"), "pridjevska") &&
      !isEqual(get(values, "type"), "k") &&
      !isEqual(get(values, "type"), "y") &&
      !isEqual(get(values, "type"), "+") &&
      !isEqual(get(values, "type"), "x") &&
      !includes(get(values, "word"), "-")
  );

  return filter(uniqBy(infinitiveWords, "word"), (values) => !isEmpty(get(values, ["type"])));
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
    const englishTypes = map(words, (values) => {
      const type = get(values, ["type"]);
      const typeTranslation = getTypeTranslation(type);

      return {
        word: get(values, ["word"]),
        type: typeTranslation,
      };
    });
    const wordsString = JSON.stringify({
      data: englishTypes,
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
