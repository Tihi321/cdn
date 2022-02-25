import { generateRandomQuote } from "./random/quotes";
import { generateRandomWord, generateRandomWordCroatian } from "./random/word";
import { saveToDisk } from "./write";

const randomQuote = generateRandomQuote();
saveToDisk("random/quote.json", randomQuote);

const randomWord = generateRandomWord();
saveToDisk("random/word.json", randomWord);

const croatianRandomWord = generateRandomWordCroatian();
saveToDisk("random/croatian-word.json", croatianRandomWord);
