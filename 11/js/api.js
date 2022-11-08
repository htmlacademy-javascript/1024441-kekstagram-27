import {showAlert} from './util.js';
import {showFilters} from './filter-photo.js';

const getData = () => {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((miniatures) => {
      showFilters(miniatures);
    })
    .catch(() => {
      showAlert();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://27.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить фотографию. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить фотографию. Попробуйте ещё раз');
    });
};

export{
  getData,
  sendData
};
