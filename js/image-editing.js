const SCALE_STEP = 25;
const MIN_VALUE_SCALE_CONTROL = 25;
const MAX_VALUE_SCALE_CONTROL = 100;
const GET_PERCENT = 100;
const EFFECT_CHROME_STEP = 0.1;
const EFFECT_SEPIA_STEP = 0.1;
const EFFECT_MARVIN_STEP = 1;
const EFFECT_PHOBOS_STEP = 0.1;
const EFFECT_HEAT_STEP = 0.1;

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
  const effectsList = modal.querySelector('.effects__list');
  const valueElement = modal.querySelector('.effect-level__value');
  const originalEffects = modal.querySelector('#effect-none');

  // стоит ли завести новый модуль в котором будет храниться библиотека эффектов ?

  const effects = {
    none: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: '',
      class: 'effects__preview--none',
      filter: ' ',
      simbol: ''
    },
    chrome: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: EFFECT_CHROME_STEP,
      class: 'effects__preview--chrome',
      filter: 'grayscale',
      simbol: ''
    },
    sepia: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: EFFECT_SEPIA_STEP,
      class: 'effects__preview--sepia',
      filter: 'sepia',
      simbol: ''
    },
    marvin: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: EFFECT_MARVIN_STEP,
      class: 'effects__preview--marvin',
      filter: 'invert',
      simbol: '%'
    },
    phobos: {
      range: {
        min: 0,
        max: 3
      },
      start: 100,
      step: EFFECT_PHOBOS_STEP,
      class: 'effects__preview--phobos',
      filter: 'blur',
      simbol: 'px'
    },
    heat: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: EFFECT_HEAT_STEP,
      class: 'effects__preview--heat',
      filter: 'brightness',
      simbol: ''
    }
  };


  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  const isOriginalEffect = () => {
    if(originalEffects.checked) {
      return sliderElement.classList.add('hidden');
    }return sliderElement.classList.remove('hidden');
  };

  // по хорошему слайдер должен вообще удаляться, но у меня так ине получилось реализовать это
  // что я пробовал :
  // const isOriginalEffects = () => {
  //   if(originalEffects.checked) {
  //    return sliderElement.noUiSlider.destroy();
  //   }return noUiSlider.create(sliderElement, {
  //     range: {
  //       min: 0,
  //       max: 100,
  //     },
  //     start: 100,
  //     step: 1,
  //     connect: 'lower',
  //   });;
  // };
  // и разные вариации, думал через ключ - у которого значение будет булевым - его передавать через .setAttribute()


  isOriginalEffect();
  effectsList.addEventListener('change', (evt) => {
    isOriginalEffect();
    photo.className = '';
    photo.style.filter = 'none';
    sliderElement.noUiSlider.updateOptions({
      range: effects[evt.target.value].range,
      start: effects[evt.target.value].start,
      step: effects[evt.target.value].step,
    });
    photo.classList.add(effects[evt.target.value].class);
    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      photo.style.filter = `${effects[evt.target.value].filter}(${valueElement.value}${effects[evt.target.value].simbol})`;
    });
  });
};

export {
  photoScale
};
