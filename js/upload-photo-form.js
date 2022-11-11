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
const DESCRIPTION_MAX_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const PHOTO_TYPES = ['jpg', 'jpeg', 'png'];
const uploadForm = document.querySelector('.img-upload__form');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});
const uploadButton = uploadForm.querySelector('.img-upload__input');
const selectedPhoto = uploadForm.querySelector('.img-upload__preview img');
const userUploarWindow = uploadForm.querySelector('.img-upload__overlay');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const hashtag = /^#[a-zа-яё0-9]+$/i;
const hash = /^#/;
const discriptionField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const clearInputsValue = () => {
  hashtagField.value = '';
  discriptionField.value = '';
  uploadButton.value = '';
  pristine.reset();
};

const hasHash = (inputValue) => getTags(inputValue).every((tag) => hash.test(tag));

const isMaxLengthTag = (inputValue) => getTags(inputValue).every((tag) => !(tag.length > MAX_LENGTH_HASHTAG));

const isValidHashtag = (inputValue) => getTags(inputValue).every((tag) => (hashtag.test(tag) && !(tag.length < MIN_LENGTH_HASHTAG)));

const checkMaxTags = (inputValue) => !(getTags(inputValue).length > MAX_HASHTAG_COUNT);

const hasDuplicates = (inputValue) => getTags(inputValue.toUpperCase()).every((item, index, array) => array.indexOf(item) === array.lastIndexOf(item));

const isMaxLengthDiscription = (inputValue) => isMaxLength(inputValue, DESCRIPTION_MAX_LENGTH);

let closeModal;

const onUploadButtonChange = () => {
  closeModal = setModalListeners(userUploarWindow, resetEffects);
  const file = uploadButton.files[0];
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
  `Хэштег - не должен быть больше ${MAX_LENGTH_HASHTAG} символов`
);

pristine.addValidator(
  hashtagField,
  isValidHashtag,
  `Хэштег - после решётки должен состоять минимум из ${MIN_LENGTH_HASHTAG}, букв или чисел и не может содержать пробелы, символы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д`
);

pristine.addValidator(
  hashtagField,
  checkMaxTags,
  `Нельзя добавлять больше ${MAX_HASHTAG_COUNT} Хэштегов`
);

pristine.addValidator(
  hashtagField,
  hasDuplicates,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  discriptionField,
  isMaxLengthDiscription,
  `Описание фотографии не может быть длинее ${DESCRIPTION_MAX_LENGTH} символов`
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

export {
  clearInputsValue,
  closeModal
};
