import get from "lodash/get";
import quotesEng from "../../assets/api/quotes-eng.json";
import { getRandomArrayIndex } from "../utils/array";
import { TApi } from "../types/api";

export const generateRandomEngQuote = () => {
  const JSONData = quotesEng as TApi;
  const itemIdex = getRandomArrayIndex(JSONData.data);

  return JSON.stringify({
    data: get(JSONData.data, itemIdex),
  });
};
