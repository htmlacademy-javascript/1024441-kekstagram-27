import {
  setModalListeners,
  isMaxLength,
  getTags
} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});
const uploadButton = uploadForm.querySelector('.img-upload__input');
const userUploarWindow = uploadForm.querySelector('.img-upload__overlay');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const hashtag = /^#[a-zа-яё0-9]+$/i;
const hash = /^#/;
const discriptionField = uploadForm.querySelector('.text__description');
const MIN_LENGTH_HASHTAG = 3;
const MAX_LENGTH_HASHTAG = 20;
const MAX_LANGTH_DISCRIPTION_FIELD = 140;
const MAX_HASHTAG_COUNT = 5;

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
uploadButton.addEventListener('change', () => {
  setModalListeners(userUploarWindow);
});
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
  if(!pristine.validate()){
    evt.preventDefault();
  }
});
