const SCALE_STEP = 25;
const MIN_VALUE_SCALE_CONTROL = 25;
const MAX_VALUE_SCALE_CONTROL = 100;
const GET_PERCENT = 100;

const photoScale = (modal) => {
  const scaleForm = modal.querySelector('.scale');
  const scaleConstrolValue = scaleForm.querySelector('.scale__control--value');
  const scaleSmaller = scaleForm.querySelector('.scale__control--smaller');
  const scaleBigger = scaleForm.querySelector('.scale__control--bigger');
  const selectedPhoto = modal.querySelector('.img-upload__preview');
  const photo = selectedPhoto.querySelector('img');

  scaleSmaller.addEventListener('click', () => {
    scaleConstrolValue.value = `${parseInt(scaleConstrolValue.value, 10) - SCALE_STEP}%`;
    photo.style.transform = `scale(${parseInt(scaleConstrolValue.value, 10) / GET_PERCENT})`;

    if(parseInt(scaleConstrolValue.value, 10) <= MIN_VALUE_SCALE_CONTROL) {
      scaleConstrolValue.value = `${MIN_VALUE_SCALE_CONTROL}%`;
      photo.style.transform = `scale(${parseInt(scaleConstrolValue.value, 10) / GET_PERCENT})`;
    }
  });

  scaleBigger.addEventListener('click', () => {
    scaleConstrolValue.value = `${parseInt(scaleConstrolValue.value, 10) + SCALE_STEP}%`;
    photo.style.transform = `scale(${parseInt(scaleConstrolValue.value, 10) / GET_PERCENT})`;

    if(parseInt(scaleConstrolValue.value, 10) >= MAX_VALUE_SCALE_CONTROL) {
      scaleConstrolValue.value = `${MAX_VALUE_SCALE_CONTROL}%`;
      photo.style.transform = `scale(${parseInt(scaleConstrolValue.value, 10) / GET_PERCENT})`;
    }
  });

  const sliderElement = document.querySelector('.effect-level__slider');

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
  });
};

export {
  photoScale
};
// // С помощью библиотеки noUiSlider (/vendor/nouislider) реализуйте применение
// эффекта для изображения. Кроме визуального применения эффекта необходимо записывать
// значение в скрытое поле для дальнейшей отправки на сервер.

//Наложение эффекта на изображение:

// По умолчанию должен быть выбран эффект «Оригинал».
// На изображение может накладываться только один эффект.
// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio,
// добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту.
// Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.
// Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реализуется`
// сторонней библиотекой для реализации слайдеров noUiSlider. Уровень эффекта записывается в поле .
// effect-level__value. При изменении уровня интенсивности эффекта (предоставляется API слайдера),
// CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.
// При выборе эффекта «Оригинал» слайдер скрывается.
// При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.

// // Обратите внимание, что при переключении фильтра, уровень эффекта должен сразу
// сбрасываться до начального состояния, т. е. логика по определению уровня насыщенности
// должна срабатывать не только при «перемещении» слайдера, но и при переключении фильтров.
