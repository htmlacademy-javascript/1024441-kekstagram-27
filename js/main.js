//Должна ли функция getRandomInteger принимать не целые числа?
//На сколкьо такой вариант написания приемлем: const getRandomInteger = (fromNumber, beforeNumber) => !(fromNumber <= 0 || beforeNumber <= 0 || beforeNumber < fromNumber) ? NaN : Math.floor(Math.random() * (fromNumber - beforeNumber + 1)) + beforeNumber;
//Функцияю взял с ресурса https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random - у меня достаточно глупый вопрос, аж стдно: зачем +1 в расчетах???

const getRandomInteger = (fromNumber, beforeNumber) => {
  if(fromNumber <= 0 || beforeNumber <= 0 || beforeNumber < fromNumber) {
    return NaN;
  }
  return Math.floor(Math.random() * (fromNumber - beforeNumber + 1)) + beforeNumber;
};

getRandomInteger();

const stringLength = (string, maxLength) => !((string > maxLength));

stringLength();
