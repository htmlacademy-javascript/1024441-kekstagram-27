import {
  createDOMElement,
  setModalListeners
} from './util.js';

const COMMENTS_STEP = 5;

const showBigPicture = (url, likes, comments, description) => {
  const fullPicture = document.querySelector('.big-picture');
  const loadComments = fullPicture.querySelector('.comments-loader');
  loadComments.classList.add('hidden');

  setModalListeners(fullPicture, () => {
    // loadComments.removeEventListener('click', onLoadCommntsClick);
  });

  const img = fullPicture.querySelector('img');
  img.src = url;

  const likesCount = fullPicture.querySelector('.likes-count');
  likesCount.textContent = likes;

  const count = fullPicture.querySelector('.comments-count');

  const countTotal = fullPicture.querySelector('.comments-count-total');
  countTotal.textContent = comments.length;

  const descriptionPhoto = fullPicture.querySelector('.social__caption');
  descriptionPhoto.textContent = description;

  const commentCount = fullPicture.querySelector('.social__comment-count');
  commentCount.classList.add('hidden');

  const socialComments = document.querySelector('.social__comments');

  const countNumber = COMMENTS_STEP;

  const commentsSlice = comments.slice(0, countNumber);
  count.textContent = commentsSlice.length;
  socialComments.innerHTML = '';

  const commentFragments = document.createDocumentFragment();

  commentsSlice.forEach((({avatar, name, message}) => {
    const commentContainer = createDOMElement('li', 'social__comment');

    const avatarUsers = createDOMElement('img', 'social__picture');
    avatarUsers.src = avatar;
    avatarUsers.alt = name;
    commentContainer.append(avatarUsers);

    const commentText = createDOMElement('p', 'social__text');
    commentText.textContent = message;
    commentContainer.append(commentText);
    commentFragments.append(commentContainer);
  }));
  socialComments.append(commentFragments);

};

export {showBigPicture};


// Заводишь переменную с количеством комментов для отрисовки и функцию, в которой будет генерироваться массив и передаваться на отрисовку. Комменты отрисованные до этого само собой нужно очищать. Длина этого массива у тебя будет числом показанных
