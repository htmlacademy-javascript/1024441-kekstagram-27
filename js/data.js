import {
  getRandomInteger,
  getRandomArrayElement
} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENT_NAMES = [
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
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(COMMENT_NAMES),
});

const createObject = (id) => {
  const comments = [];
  const commentsCount = getRandomInteger(1, 16);

  for (let i = 1; i <= commentsCount; i++) {
    comments.push(createComment(i));
  }

  return {
    id,
    url: `photos/${id}.jpg`,
    description: 'А я вообще с малышом на руках зарабатываю по 40тыс. в неделю',
    likes: getRandomInteger(15, 200),
    comments
  };
};


const createObjects = (count = 25) => {
  const objects = [];
  for (let i = 1; i <= count; i++) {
    objects.push(createObject(i));
  }
  return objects;
};


export {createObjects};
