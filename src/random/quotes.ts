import get from "lodash/get";
import quotes from "../../assets/api/quotes.json";
import { getRandomArrayIndex } from "../utils/array";

export const generateRandomQuote = () => {
  const itemIdex = getRandomArrayIndex(quotes);

  return JSON.stringify(get(quotes, itemIdex));
};
