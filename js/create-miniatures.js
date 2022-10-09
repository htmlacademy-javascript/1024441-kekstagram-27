const pictures = document.querySelector('.pictures');
const templateMiniatures = document.querySelector('#picture').content.querySelector('.picture');
const similarListMiniature = document.createDocumentFragment();

const createMiniatures = (createdObjet) => {
  createdObjet.forEach((({url, likes, comments}) => {
    const miniature = templateMiniatures.cloneNode(true);
    miniature.querySelector('.picture__img').src = url;
    miniature.querySelector('.picture__comments').textContent = comments.length;
    miniature.querySelector('.picture__likes').textContent = likes;
    similarListMiniature.appendChild(miniature);
  }));
  pictures.appendChild(similarListMiniature);
};

export {createMiniatures};
