//Функцияю взял с ресурса https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomInteger = (fromNumber, beforeNumber) => {
  fromNumber = Math.ceil(fromNumber);
  beforeNumber = Math.floor(beforeNumber);
  return Math.floor(Math.random() * (beforeNumber - fromNumber) + fromNumber);
};

getRandomInteger();

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isMaxLength = (string, maxLength) => string.length <= maxLength;

const createDOMElement = (element, elementClass) => {
  const object = document.createElement(element);
  object.classList.add(elementClass);
  if (object === 'img') {
    object.width = '35';
    object.height = '35';
  }
  return object;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const ModalCloseListener = (modal) => {
  const body = document.body;
  const onModalEscKeydown = (evt) => {
    if(isEscapeKey(evt) && !evt.target.matches('.text__hashtags') && !evt.target.matches('.text__description')) {
      closeBigPicture();
    }
  };
  const onCancelClick = () => {
    closeBigPicture();
  };

  const cancel = modal.querySelector('.cancel');
  cancel.addEventListener('click', onCancelClick);

  function openFullPic () {
    modal.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onModalEscKeydown);
  }

  openFullPic();

  function closeBigPicture () {
    modal.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onModalEscKeydown);
    cancel.removeEventListener('click', onCancelClick);
  }
};

export {
  getRandomInteger,
  getRandomArrayElement,
  createDOMElement,
  ModalCloseListener,
  isMaxLength
};
