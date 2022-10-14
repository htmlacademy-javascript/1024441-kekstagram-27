import {ModalListener} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('.img-upload__input');
const userUploarWindow = uploadForm.querySelector('.img-upload__overlay');

uploadButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  ModalListener(userUploarWindow);
});
