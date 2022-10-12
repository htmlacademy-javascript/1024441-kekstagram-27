import {elementCreator} from './html-element-creator.js';

const MiniatureClickHandler = (url, likes, comments, description) => {

  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  const body = document.body;
  body.classList.add('modal-open');

  const cancel = bigPicture.querySelector('.big-picture__cancel');
  cancel.addEventListener('click', ()=> {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt)=> {
    if(evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });

  const img = bigPicture.querySelector('img');
  img.src = url;

  const likesCount = bigPicture.querySelector('.likes-count');
  likesCount.textContent = likes;

  const comment = bigPicture.querySelector('.comments-count');
  comment.textContent = comments.length;

  const descriptionPhoto = bigPicture.querySelector('.social__caption');
  descriptionPhoto.textContent = description;

  const commentCount = bigPicture.querySelector('.social__comment-count');
  commentCount.classList.add('hidden');

  const newComment = bigPicture.querySelector('.comments-loader');
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

export {MiniatureClickHandler};
