//Функцияю взял с ресурса https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomInteger = (fromNumber, beforeNumber) => {
  fromNumber = Math.ceil(fromNumber);
  beforeNumber = Math.floor(beforeNumber);
  return Math.floor(Math.random() * (beforeNumber - fromNumber) + fromNumber);
};

getRandomInteger();

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isMaxLength = (string, maxLength) => string.length <= maxLength;

isMaxLength('олег', 3);

export {getRandomInteger, getRandomArrayElement};
