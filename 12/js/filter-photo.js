import {createMiniatures} from './create-miniatures.js';
import {
  getRandomArrayElement,
  debounce
} from './util.js';

const MAX_RANDOM_COUNT_VALUE = 10;
const imageFilters = document.querySelector('.img-filters');
const imageFiltersForm = imageFilters.querySelector('.img-filters__form');
const filterButtons = imageFiltersForm.querySelectorAll('.img-filters__button');
const defaultFilter = imageFiltersForm.querySelector('#filter-default');
const randomFilter = imageFiltersForm.querySelector('#filter-random');
const discussedFilter = imageFiltersForm.querySelector('#filter-discussed');

const removeClassButtons = (filterButton) => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  filterButton.classList.add('img-filters__button--active');
};

const compareCommentsLength = (miniatureA, miniatureB) => {
  if (miniatureA.comments.length < miniatureB.comments.length) {
    return 1;
  }
  if (miniatureA.comments.length > miniatureB.comments.length) {
    return -1;
  }
  return 0;
};

const showFilters = (miniatures) => {
  const onImageFiltersFormClick = (evt) => {
    const miniaturesCopy = miniatures.slice(0, 25);
    if(evt.target === defaultFilter) {
      removeClassButtons(defaultFilter);
      createMiniatures(miniatures);
    }
    if(evt.target === randomFilter) {
      removeClassButtons(randomFilter);
      const randomMassive = [];
      let i = MAX_RANDOM_COUNT_VALUE;
      while(i > 0) {
        const randomMiniature = getRandomArrayElement(miniaturesCopy);
        if(!randomMassive.includes(randomMiniature)){
          randomMassive.push(randomMiniature);
          i--;
        }
      }
      createMiniatures(randomMassive);
    }
    if(evt.target === discussedFilter) {
      removeClassButtons(discussedFilter);
      miniaturesCopy.sort(compareCommentsLength);
      createMiniatures(miniaturesCopy);
    }
  };
  imageFilters.classList.remove('img-filters--inactive');
  createMiniatures(miniatures);
  imageFiltersForm.addEventListener('click', debounce(onImageFiltersFormClick));
};

export {showFilters};
