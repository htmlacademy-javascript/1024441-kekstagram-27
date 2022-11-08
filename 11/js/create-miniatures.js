import {showBigPicture} from './big-pictures.js';

const pictures = document.querySelector('.pictures');
const templateMiniatures = document.querySelector('#picture').content.querySelector('.picture');
const similarListMiniature = document.createDocumentFragment();

const createMiniatures = (createdObjet) => {
  const miniatures = pictures.querySelectorAll('.picture');
  miniatures.forEach((miniature) =>
    miniature.remove(miniature)
  );
  createdObjet
    .forEach((({url, likes, comments, description}) => {
      const miniature = templateMiniatures.cloneNode(true);
      miniature.querySelector('.picture__img').src = url;
      miniature.querySelector('.picture__comments').textContent = comments.length;
      miniature.querySelector('.picture__likes').textContent = likes;
      miniature.addEventListener('click', () => {
        showBigPicture(url, likes, comments, description);
      });
      similarListMiniature.append(miniature);
    }));
  pictures.append(similarListMiniature);
};

export {createMiniatures};
