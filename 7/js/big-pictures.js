import {
  createDOMElement,
  ModalCloseListener
} from './util.js';

const showBigPicture = (url, likes, comments, description) => {
  const fullPicture = document.querySelector('.big-picture');

  ModalCloseListener(fullPicture);

  const img = fullPicture.querySelector('img');
  img.src = url;

  const likesCount = fullPicture.querySelector('.likes-count');
  likesCount.textContent = likes;

  const comment = fullPicture.querySelector('.comments-count');
  comment.textContent = comments.length;

  const descriptionPhoto = fullPicture.querySelector('.social__caption');
  descriptionPhoto.textContent = description;

  const commentCount = fullPicture.querySelector('.social__comment-count');
  commentCount.classList.add('hidden');

  const newComment = fullPicture.querySelector('.comments-loader');
  newComment.classList.add('hidden');

  const socialComments = document.querySelector('.social__comments');
  socialComments.innerHTML = '';

  const commentFragments = document.createDocumentFragment();

  comments.forEach((({avatar, name, message}) => {

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

  if(comments.length > 5) {
    commentCount.classList.remove('hidden');
    newComment.classList.remove('hidden');
  }

  const array = socialComments.querySelectorAll('li');

  for(let i = 0; i < array.length; i++) {
    if(i === 5) {
      for(let j = i; j < array.length; j++) {
        array[j].classList.add('hidden');
      }
    }
  }

  // newComment.addEventListener('click', () => {
  //   // нужно перебрать массив array на наличие тега hidden contains/matches
  // });
};

export {showBigPicture};
