//Функцияю взял с ресурса https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
import{clearInputsValue} from './upload-photo-form.js';

const ALERT_SHOW_TIME = 5000;
const body = document.body;

const getRandomInteger = (fromNumber, beforeNumber) => {
  fromNumber = Math.ceil(fromNumber);
  beforeNumber = Math.floor(beforeNumber);
  return Math.floor(Math.random() * (beforeNumber - fromNumber) + fromNumber);
};

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
    if(isEscapeKey(evt) && !evt.target.matches('.text__hashtags') && !evt.target.matches('.text__description') && !document.querySelector('.error')){
      closeModal();
    }
  };

  const openModal = () => {
    modal.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  };

  openModal();

  const onCancelClick = () => {
    closeModal();
  };

  const cancel = modal.querySelector('.cancel');
  cancel.addEventListener('click', onCancelClick);

  function closeModal () {
    modal.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
    cancel.removeEventListener('click', onCancelClick);
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

const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '25%';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.lineHeight = '30px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';

  alertContainer.textContent = 'Не удалось загрузить фотографии. Попробуйте ещё раз через некоторое время';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const removeFormModalMessege = (modal,closeButton) => {
  const onModalClick = (evt) => {
    if(!evt.target.closest(`.${modal.className}__inner`)){
      destroyModal();
    }
  };

  modal.addEventListener('click', onModalClick);

  const onDocumentKeydown = (evt) => {
    if(isEscapeKey(evt)){
      destroyModal();
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);

  const cancel = modal.querySelector(closeButton);
  cancel.addEventListener('click', () => {
    destroyModal();
  },{once:true});

  function destroyModal () {
    body.lastChild.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    modal.removeEventListener('click', onModalClick);
  }
};

const createFormModalMessage = (type) => {
  const templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
  const templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
  let message;
  if(type === 'success') {
    message = templateSuccessMessage.cloneNode(true);
    removeFormModalMessege(message, '.success__button');
  }
  if(type === 'error') {
    message = templateErrorMessage.cloneNode(true);
    removeFormModalMessege(message, '.error__button');
  }
  body.append(message);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomInteger,
  getRandomArrayElement,
  createDOMElement,
  setModalListeners,
  isMaxLength,
  getTags,
  showAlert,
  createFormModalMessage,
  debounce
};
