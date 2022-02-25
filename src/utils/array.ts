import random from "lodash/random";

export const getRandomArrayIndex = <T>(array: Array<T>): number => random(array.length - 1);
