//Функцияю взял с ресурса https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomInteger = (fromNumber, beforeNumber) => {
  fromNumber = Math.ceil(fromNumber);
  beforeNumber = Math.floor(beforeNumber);
  return Math.floor(Math.random() * (beforeNumber - fromNumber) + fromNumber);
};

getRandomInteger();

const isMaxLength = (string, maxLength) => (maxLength >= string.length);

isMaxLength();

const SIMILAR_OBJECT_PHOTO = 25;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const MESSAGE = [
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'В целом всё неплохо. Но не всё.',
  'Всё отлично!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'
];

const COMMENT_NAME = [
  'Елена',
  'Вадим',
  'Мария',
  'Олег',
  'Наталья',
  'Евгений',
  'Евгения'
];

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${id}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(COMMENT_NAME),
});

const createObject = (id) => {
  const comments = [];
  const commentsCount = getRandomInteger(1, 2);

  for (let i = 1; i <= commentsCount; i++) {
    comments.push(createComment(i));
  }

  return {
    id,
    url: `photos${id}.jpg`,
    discription: 'А я вообще с малышом на руках зарабатываю по 40тыс. в неделю',
    likes: getRandomInteger(15, 200),
    comments
  };
};

const createObjects = (count) => {
  const objects = [];

  for (let i = 1; i <= count; i++) {
    objects.push(createObject(i));
  }
  return objects;
};

createObjects(SIMILAR_OBJECT_PHOTO);
