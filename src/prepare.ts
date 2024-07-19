import { map } from "lodash";
import {
  cleanEnglishWords,
  cleanCroatianWords,
  joinWordsUp,
  cleanEnglishWordDetails,
  cleanEnglishWordsVovcabulary,
  cleanCroatianWordDetails,
  cleanCroatianWordsVovcabulary,
} from "./prepare/words";
import { saveToDisk } from "./write";
import { splitWordsUp } from "./utils/clean";

const cleanEngWords = cleanEnglishWords();
const spliEngoWords = splitWordsUp(cleanEngWords);

map(spliEngoWords, (words, index) => {
  saveToDisk(`prepare/words-eng-${index}.json`, JSON.stringify({ data: words }));
});

const joinedEngWords = joinWordsUp();
saveToDisk(`prepare/words-eng.json`, joinedEngWords);

const cleanCroWords = cleanCroatianWords();
const splitCroWords = splitWordsUp(cleanCroWords);

map(splitCroWords, (words, index) => {
  saveToDisk(`prepare/words-cro-${index}.json`, JSON.stringify({ data: words }));
});

const joinedCroWords = joinWordsUp();
saveToDisk(`prepare/words-cro.json`, joinedCroWords);

const wordsEngDetailes = cleanEnglishWordDetails();
saveToDisk(`prepare/words-details-eng.json`, JSON.stringify(wordsEngDetailes));

const wordsCroDetailes = cleanCroatianWordDetails();
saveToDisk(`prepare/words-details-cro.json`, JSON.stringify(wordsCroDetailes));

const wordsEngVocabulary = cleanEnglishWordsVovcabulary();
saveToDisk(`prepare/vocabulary-words-eng.json`, JSON.stringify(wordsEngVocabulary));

const wordsCroVocabulary = cleanCroatianWordsVovcabulary();
saveToDisk(`prepare/vocabulary-words-cro.json`, JSON.stringify(wordsCroVocabulary));
