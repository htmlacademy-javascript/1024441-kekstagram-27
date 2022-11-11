import {showBigPicture} from './big-pictures.js';

const pictures = document.querySelector('.pictures');
const templateThumbnails = document.querySelector('#picture').content.querySelector('.picture');
const similarListThumbnail = document.createDocumentFragment();

const renderThumbnails = (createdObjet) => {
  const thumbnails = pictures.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) =>
    thumbnail.remove(thumbnail)
  );
  createdObjet
    .forEach((({url, likes, comments, description}) => {
      const thumbnail = templateThumbnails.cloneNode(true);
      thumbnail.querySelector('.picture__img').src = url;
      thumbnail.querySelector('.picture__comments').textContent = comments.length;
      thumbnail.querySelector('.picture__likes').textContent = likes;
      thumbnail.addEventListener('click', () => {
        showBigPicture(url, likes, comments, description);
      });
      similarListThumbnail.append(thumbnail);
    }));
  pictures.append(similarListThumbnail);
};

export {renderThumbnails};
