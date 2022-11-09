import {
  setModalListeners,
  isMaxLength,
  getTags,
  createFormModalMessage
} from './util.js';

import {
  resetEffects
} from './image-editing.js';

import {
  sendData
} from './api.js';

const MIN_LENGTH_HASHTAG = 3;
const MAX_LENGTH_HASHTAG = 20;
const MAX_LANGTH_DISCRIPTION_FIELD = 140;
const MAX_HASHTAG_COUNT = 5;
const PHOTO_TYPES = ['jpg', 'jpeg', 'png'];
const uploadForm = document.querySelector('.img-upload__form');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});
const uploadButton = uploadForm.querySelector('.img-upload__input');
const fileChooser = uploadForm.querySelector('.img-upload__input');
const selectedPhoto = uploadForm.querySelector('.img-upload__preview img');
const userUploarWindow = uploadForm.querySelector('.img-upload__overlay');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const hashtag = /^#[a-zа-яё0-9]+$/i;
const hash = /^#/;
const discriptionField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const clearInputsValue = () => {
  hashtagField.innerHTML = '';
  discriptionField.innerHTML = '';
  uploadButton.value = '';
  pristine.reset();
};

const hasHash = (inputValue) => inputValue.length > 0
  ? getTags(inputValue).every((tag) => hash.test(tag))
  : true;

const isMaxLengthTag = (inputValue) => inputValue.length > 0
  ? getTags(inputValue).every((tag) => !(tag.length > MAX_LENGTH_HASHTAG))
  : true;

const isValidHashtag = (inputValue) => inputValue.length > 0
  ? getTags(inputValue).every((tag) => (hashtag.test(tag) && !(tag.length < MIN_LENGTH_HASHTAG)))
  : true;

const checkMaxTags = (inputValue) => !(getTags(inputValue).length > MAX_HASHTAG_COUNT);

const hasDuplicates = (inputValue) => getTags(inputValue.toUpperCase()).some((item, index, array) => array.indexOf(item) === array.lastIndexOf(item));

const isMaxLengthDiscription = (inputValue) => isMaxLength(inputValue, MAX_LANGTH_DISCRIPTION_FIELD);

clearInputsValue();

let closeModal;

const onUploadButtonChange = () => {
  closeModal = setModalListeners(userUploarWindow, resetEffects);
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = PHOTO_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    selectedPhoto.src = URL.createObjectURL(file);
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

uploadButton.addEventListener('change', onUploadButtonChange);

pristine.addValidator(
  hashtagField,
  hasHash,
  'Хэштег - должен начинаться с #'
);

pristine.addValidator(
  hashtagField,
  isMaxLengthTag,
  'Хэштег - не должен быть больше 20 символов'
);

pristine.addValidator(
  hashtagField,
  isValidHashtag,
  'Хэштег -после решётки должен состоять минимум из трех символов, букв или чисел и не может содержать пробелы, символы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д'
);

pristine.addValidator(
  hashtagField,
  checkMaxTags,
  'Нельзя добавлять больше пяти Хэштегов'
);

pristine.addValidator(
  hashtagField,
  hasDuplicates,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  discriptionField,
  isMaxLengthDiscription,
  'Описание фотографии не может быть длинее 140 символов'
);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid){
    blockSubmitButton();
    sendData(
      () => {
        closeModal();
        unblockSubmitButton();
        createFormModalMessage('success');
      },
      () => {
        createFormModalMessage('error');
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );}
});

// Если отправка данных прошла успешно, показывается соответствующее сообщение.
// Разметку сообщения, которая находится в блоке #success внутри шаблона template, нужно
// разместить перед закрывающим тегом </body>. Сообщение должно исчезать после нажатия на
// кнопку .success__button, по нажатию на клавишу Esc и по клику на произвольную область
//  экрана за пределами блока с сообщением.

// Если при отправке данных произошла ошибка запроса, нужно показать соответствующее сообщение.
// Разметку сообщения, которая находится в блоке #error внутри шаблона template, нужно разместить
// перед закрывающим тегом </body>. Сообщение должно исчезать после нажатия на кнопку .error__button,
// по нажатию на клавишу Esc и по клику на произвольную область экрана за пределами блока с сообщением.
// В таком случае вся введённая пользователем информация сохраняется, чтобы у него была возможность отправить форму повторно.

export {
  clearInputsValue,
  closeModal
};
