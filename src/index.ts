import { generateRandomEngQuote } from "./random/quotes";
import {
  generateRandomVocabularyEngWord,
  generateRandomVocabularyCroWord,
  generateRandomEngWord,
  generateRandomCroWord,
} from "./random/word";
import { saveToDisk } from "./write";

const randomQuote = generateRandomEngQuote();
saveToDisk("random/quote-eng.json", randomQuote);

const vocabularyRandomEngWord = generateRandomVocabularyEngWord();
saveToDisk("random/vocabulary-word-en.json", vocabularyRandomEngWord);

const vocabularyRandomCroWord = generateRandomVocabularyCroWord();
saveToDisk("random/vocabulary-word-cro.json", vocabularyRandomCroWord);

const randomEngWord = generateRandomEngWord();
saveToDisk("random/vocabulary-word-en.json", randomEngWord);

const randomCroWord = generateRandomCroWord();
saveToDisk("random/vocabulary-word-cro.json", randomCroWord);
