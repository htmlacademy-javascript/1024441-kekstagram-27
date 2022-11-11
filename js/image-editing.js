const SCALE_STEP = 25;
const ORIGINAL_SCALE_VALUE = 1;
const MIN_VALUE_SCALE_CONTROL = 25;
const MAX_VALUE_SCALE_CONTROL = 100;
const GET_PERCENT = 100;
const EFFECT_CHROME_STEP = 0.1;
const EFFECT_SEPIA_STEP = 0.1;
const EFFECT_MARVIN_STEP = 1;
const EFFECT_PHOBOS_STEP = 0.1;
const EFFECT_HEAT_STEP = 0.1;

const uploadForm = document.querySelector('.img-upload__form');
const scaleForm = uploadForm.querySelector('.scale');
const scaleControlValue = scaleForm.querySelector('.scale__control--value');
const scaleSmaller = scaleForm.querySelector('.scale__control--smaller');
const scaleBigger = scaleForm.querySelector('.scale__control--bigger');
const selectedPhoto = uploadForm.querySelector('.img-upload__preview img');
const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const effectsList = uploadForm.querySelector('.effects__list');
const valueElement = uploadForm.querySelector('.effect-level__value');
const originalEffects = uploadForm.querySelector('#effect-none');
const effects = {
  none: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: '',
    class: 'effects__preview--none',
    filter: '',
    unit: ''
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
    unit: ''
  },
  sepia: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: EFFECT_SEPIA_STEP,
    filterClass: 'effects__preview--sepia',
    filter: 'sepia',
    unit: ''
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: EFFECT_MARVIN_STEP,
    filterClass: 'effects__preview--marvin',
    filter: 'invert',
    unit: '%'
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 100,
    step: EFFECT_PHOBOS_STEP,
    filterClass: 'effects__preview--phobos',
    filter: 'blur',
    unit: 'px'
  },
  heat: {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: EFFECT_HEAT_STEP,
    filterClass: 'effects__preview--heat',
    filter: 'brightness',
    unit: ''
  }
};

const getImageTransformValue = (inputValue) => `scale(${inputValue / GET_PERCENT})`;

effectLevel.classList.add('hidden');

const onScaleBiggerClick = () => {
  let scaleInputValue = parseInt(scaleControlValue.value, 10) + SCALE_STEP;
  if(scaleInputValue >= MAX_VALUE_SCALE_CONTROL) {
    scaleInputValue = MAX_VALUE_SCALE_CONTROL;
  }
  selectedPhoto.style.transform = getImageTransformValue(scaleInputValue);
  scaleControlValue.value = `${scaleInputValue}%`;
};
scaleBigger.addEventListener('click', onScaleBiggerClick);

const onSclaeSmallerClick = () => {
  let scaleInputValue = parseInt(scaleControlValue.value, 10) - SCALE_STEP;
  if(scaleInputValue <= MIN_VALUE_SCALE_CONTROL) {
    scaleInputValue = MIN_VALUE_SCALE_CONTROL;
  }
  selectedPhoto.style.transform = getImageTransformValue(scaleInputValue);
  scaleControlValue.value = `${scaleInputValue}%`;
};
scaleSmaller.addEventListener('click', onSclaeSmallerClick);


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});


const removeEffetct = () => {
  selectedPhoto.className = '';
  selectedPhoto.style.filter = '';
};

effectsList.addEventListener('change', (evt) => {
  effectLevel.classList.toggle('hidden', evt.target === originalEffects);
  removeEffetct();
  sliderElement.noUiSlider.off();
  if (sliderElement.noUiSlider) {
    const selectedEffect = effects[evt.target.value];
    const {range, start, step, filterClass, filter, unit} = selectedEffect;
    sliderElement.noUiSlider.updateOptions({
      range: range,
      start: start,
      step: step,
    });
    selectedPhoto.classList.add(filterClass);
    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      selectedPhoto.style.filter = `${filter}(${valueElement.value}${unit})`;
    });
  }
});

const resetEffects = () => {
  selectedPhoto.style.transform = `scale(${ORIGINAL_SCALE_VALUE})`;
  scaleControlValue.value = `${MAX_VALUE_SCALE_CONTROL}%`;
  effectLevel.classList.add('hidden');
  removeEffetct();

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

export {
  resetEffects
};
