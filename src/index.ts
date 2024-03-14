import axios from "axios";

import { generateRandomEngQuote } from "./random/quotes";
import {
  generateRandomVocabularyEngWord,
  generateRandomVocabularyCroWord,
  generateRandomEngWord,
  generateRandomCroWord,
  generateRandomDetailsCroWord,
  generateRandomDetailsEngWord,
} from "./random/word";
import { saveToDisk } from "./write";

const randomQuote = generateRandomEngQuote();
saveToDisk("api/random/quote-eng.json", randomQuote);

const vocabularyRandomEngWord = generateRandomVocabularyEngWord();
saveToDisk("api/random/vocabulary-word-eng.json", vocabularyRandomEngWord);

const vocabularyRandomCroWord = generateRandomVocabularyCroWord();
saveToDisk("api/random/vocabulary-word-cro.json", vocabularyRandomCroWord);

const randomEngWord = generateRandomEngWord();
saveToDisk("api/random/word-eng.json", randomEngWord);

const randomCroWord = generateRandomCroWord();
saveToDisk("api/random/word-cro.json", randomCroWord);

const randomDetailsEngWord = generateRandomDetailsEngWord();
saveToDisk("api/random/word-details-eng.json", randomDetailsEngWord);

const randomDetailsCroWord = generateRandomDetailsCroWord();
saveToDisk("api/random/word-details-cro.json", randomDetailsCroWord);

axios
  .get("https://www.bug.hr/rss")
  .then((response) => {
    saveToDisk("rss/bug.xml", response.data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

axios
  .get("https://www.theverge.com/rss/index.xml")
  .then((response) => {
    saveToDisk("rss/verge.xml", response.data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

axios
  .get("https://techcrunch.com/feed/")
  .then((response) => {
    saveToDisk("rss/techcrunch.xml", response.data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
