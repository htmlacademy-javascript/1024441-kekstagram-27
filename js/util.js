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

const setModalListeners = (modal, removeFunction) => {
  const body = document.body;
  const onDocumentKeydown = (evt) => {
    if(isEscapeKey(evt) && !evt.target.matches('.text__hashtags') && !evt.target.matches('.text__description')) {
      closeModal();
    }
  };
  const onCancelClick = () => {
    closeModal();
  };

  const cancel = modal.querySelector('.cancel');
  cancel.addEventListener('click', onCancelClick);

  function openModal () {
    modal.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  }

  openModal();

  function closeModal () {
    modal.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
    cancel.removeEventListener('click', onCancelClick);
    removeFunction();
  }
};

const getTags = (inputValue) => {
  const splitString = (string) => string.trim().split(' ');
  const array = splitString(inputValue);
  return array;
};

export {
  getRandomInteger,
  getRandomArrayElement,
  createDOMElement,
  setModalListeners,
  isMaxLength,
  getTags
};
