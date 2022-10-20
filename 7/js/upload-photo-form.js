import {
  ModalCloseListener,
  isMaxLength
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

const inputValueCleaner = () => {
  const inputs = uploadForm.querySelectorAll('input');
  inputs.forEach((field) => {
    field.innerHTML = '';
    field.value = '';
    pristine.reset();
  });
};
inputValueCleaner();

uploadButton.addEventListener('change', () => {
  ModalCloseListener(userUploarWindow);
});

const stringSpliter = (string) => string.trim().split(' ');

function hasHash (inputValue) {
  const array = stringSpliter(inputValue);
  return inputValue.length > 0 ? array.every((tag) => hash.test(tag)) : true;
}

function isMaxLengthTag (inputValue) {
  const array = stringSpliter(inputValue);
  return inputValue.length > 0 ? array.every((tag) => !(tag.length > 19)) : true;
}

function isValidHashtag (inputValue) {
  const array = stringSpliter(inputValue);
  return inputValue.length > 0 ? array.every((tag) => hashtag.test(tag)) : true;
}

function isMaxValueTag (inputValue) {
  const array = stringSpliter(inputValue);
  return !(array.length > 5);
}

function hasDuplicates (inputValue) {
  const array = stringSpliter(inputValue.toUpperCase());
  return array.some((item) => array.indexOf(item) === array.lastIndexOf(item));
}

function isMaxLengthDiscription (inputValue) {
  return isMaxLength(inputValue, 140);
}

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
  'Хэштег - после решётки должен состоять минимум из трех символов, букв или чисел и не может содержать пробелы, символы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д'
);

pristine.addValidator(
  hashtagField,
  isMaxValueTag,
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
  if(pristine.validate() === false){
    evt.preventDefault();
  }
});
