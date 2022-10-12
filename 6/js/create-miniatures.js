import {openCloseListenerCommentsAdds} from './open-close-listener-comments-adds.js';

const pictures = document.querySelector('.pictures');
const templateMiniatures = document.querySelector('#picture').content.querySelector('.picture');
const similarListMiniature = document.createDocumentFragment();

const createMiniatures = (createdObjet) => {
  createdObjet.forEach((({url, likes, comments, description}) => {
    const miniature = templateMiniatures.cloneNode(true);
    miniature.querySelector('.picture__img').src = url;
    miniature.querySelector('.picture__comments').textContent = comments.length;
    miniature.querySelector('.picture__likes').textContent = likes;
    miniature.addEventListener('click', () => {
      openCloseListenerCommentsAdds(url, likes, comments, description);
    });
    similarListMiniature.append(miniature);
  }));
  pictures.append(similarListMiniature);
};

export {createMiniatures};
