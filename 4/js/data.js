import {getRandomInteger,getRandomArrayElement} from './util.js';

const SIMILAR_OBJECT_PHOTO = 25;

const MESSAGES = [
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'В целом всё неплохо. Но не всё.',
  'Всё отлично!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'
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
  avatar: `img/avatar-${id}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(COMMENT_NAMES),
});

const createObject = (id) => {
  const comments = [];
  const commentsCount = getRandomInteger(1, 2);

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

const generateObjects = () => {
  const createObjects = (count) => {
    const objects = [];
    for (let i = 1; i <= count; i++) {
      objects.push(createObject(i));
    }
    return objects;
  };
  return createObjects(SIMILAR_OBJECT_PHOTO);
};

export {generateObjects};
