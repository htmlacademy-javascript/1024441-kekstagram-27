//Функцияю взял с ресурса https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
import{clearInputsValue} from './upload-photo-form.js';

const ALERT_SHOW_TIME = 2000;
const body = document.body;

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
  const onDocumentKeydown = (evt) => {
    if(isEscapeKey(evt) && !evt.target.matches('.text__hashtags') && !evt.target.matches('.text__description')){
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

  const onModalClick = (evt) => {
    if(evt.target === modal){
      closeModal();
    }
  };

  modal.addEventListener('click', onModalClick);

  function closeModal () {
    modal.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
    cancel.removeEventListener('click', onCancelClick);
    modal.removeEventListener('click', onModalClick);
    removeFunction();
    clearInputsValue();
  }

  return onCancelClick;
};

const getTags = (inputValue) => {
  const splitString = (string) => string.trim().split(' ');
  const array = splitString(inputValue);
  return array;
};

const removeFormModalMessege = (modal, button) => {
  modal.addEventListener('click', (evt) => {
    if(evt.target === modal){
      destroyModal();
    }
  },{once:true});

  const onDocumentKeydown = (evt) => {
    if(isEscapeKey(evt)){
      destroyModal();
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);

  const cancel = modal.querySelector(button);
  cancel.addEventListener('click', () => {
    destroyModal();
  },{once:true});

  function destroyModal () {
    body.lastChild.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const createFormModalMessage = (isSuccess) => {
  const templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
  const templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
  const templateloadingMessage = document.querySelector('#messages').content;
  let message;
  if(isSuccess === 'success') {
    message = templateSuccessMessage.cloneNode(true);
    removeFormModalMessege(message, '.success__button');
  }
  if(isSuccess === 'error') {
    message = templateErrorMessage.cloneNode(true);
    removeFormModalMessege(message, '.error__button');
  }
  if(isSuccess === 'messages') {
    message = templateloadingMessage.cloneNode(true);
  }
  body.append(message);
  setTimeout(() => {
    message.remove();
  }, ALERT_SHOW_TIME);
};

export {
  getRandomInteger,
  getRandomArrayElement,
  createDOMElement,
  setModalListeners,
  isMaxLength,
  getTags,
  createFormModalMessage
};
