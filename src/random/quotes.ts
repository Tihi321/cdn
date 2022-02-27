import get from "lodash/get";
import quotesEng from "../../assets/api/quotes-eng.json";
import { getRandomArrayIndex } from "../utils/array";

export const generateRandomEngQuote = () => {
  const itemIdex = getRandomArrayIndex(quotesEng.data);

  return JSON.stringify(get(quotesEng, itemIdex));
};
