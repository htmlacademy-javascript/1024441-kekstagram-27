import {elementCreator} from './util.js';

const showBigPicture = (url, likes, comments, description) => {

  const fullPicture = document.querySelector('.big-picture');
  fullPicture.classList.remove('hidden');

  const body = document.body;
  body.classList.add('modal-open');

  const closeBigPicture = () => {
    fullPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  const cancel = fullPicture.querySelector('.big-picture__cancel');
  cancel.addEventListener('click', ()=> {
    closeBigPicture();
  });

  document.addEventListener('keydown', (evt)=> {
    if(evt.key === 'Escape') {
      closeBigPicture();
    }
  });

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
    const commentContainer = elementCreator('li', 'social__comment');

    const avatarUsers = elementCreator('img', 'social__picture');
    avatarUsers.src = avatar;
    avatarUsers.alt = name;
    commentContainer.append(avatarUsers);

    const commentText = elementCreator('p', 'social__text');
    commentText.textContent = message;
    commentContainer.append(commentText);
    commentFragments.append(commentContainer);
  }));
  socialComments.append(commentFragments);
};

export {showBigPicture};
