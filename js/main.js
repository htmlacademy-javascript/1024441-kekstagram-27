//Функцияю взял с ресурса https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/*Из ТЗ :Придумайте, как функция будет вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.
Например, в этом случае функция также может возвращать NaN Или же вы можете проверить, какой из аргументов больше, а какой меньше, и при необходимости поменять их местами.
- в принципе ничего сложного как я понима делаем следующее :
(beforeNumber < fromNumber)
? let swap = beforeNumber
beforeNumber = fromNumber
fromNumber = swap
но я не понимаю как это все правильно записать тернарными операторами, крутил по всякому*/

const getRandomInteger = (fromNumber, beforeNumber) => (
  fromNumber <= 0 || beforeNumber <= 0 || beforeNumber <= fromNumber || !Number.isInteger(fromNumber) || !Number.isInteger(beforeNumber)
    ? NaN
    : Math.floor(Math.random() * (fromNumber - beforeNumber + 1)) + beforeNumber
);

getRandomInteger();

const isMaxLength = (string, maxLength) => (maxLength >= string.length);

isMaxLength();
