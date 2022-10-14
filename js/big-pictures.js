import {
  createDOMElement,
  isEscapeKey,
} from './util.js';

const showBigPicture = (url, likes, comments, description) => {
  const fullPicture = document.querySelector('.big-picture');
  const body = document.body;
  const onFullPicEscKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      closeBigPicture();
    }
  };
  const cancel = fullPicture.querySelector('.big-picture__cancel');
  cancel.addEventListener('click', () => {
    closeBigPicture();
  });

  function openFullPic () {
    fullPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onFullPicEscKeydown);
  }

  openFullPic();

  function closeBigPicture () {
    fullPicture.classList.add('hidden');
    body.classList.remove('modal-open');

    document.removeEventListener('keydown', onFullPicEscKeydown);
  }

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
};

export {showBigPicture};
