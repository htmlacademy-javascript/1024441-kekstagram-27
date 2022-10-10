import {commentCreator} from './comment-creator.js';

const addThumbnailClickHandler = (url, likes, comments, description) => {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  const body = document.querySelector('body');
  body.classList.add('modal-open');

  const cancel = bigPicture.querySelector('.big-picture__cancel');
  cancel.addEventListener('click', ()=> {
    bigPicture.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt)=> {
    if(evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
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

  commentCreator(comments);
};

export {addThumbnailClickHandler};

// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

// <li class="social__comment">
//     <img
//         class="social__picture"
//         src="{{аватар}}"
//         alt="{{имя комментатора}}"
//         width="35" height="35">
//     <p class="social__text">{{текст комментария}}</p>
// </li>


// Подключите модуль в проект
