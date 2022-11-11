import {renderThumbnails} from './thumbanails.js';
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

const setActiveFilterButton = (filterButton) => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  filterButton.classList.add('img-filters__button--active');
};

const compareCommentsLength = (thumbnailsA, thumbnailsB) => thumbnailsB.comments.length - thumbnailsA.comments.length;

const setDisplayFilters = (thumbnailsArray) => {
  renderThumbnails(thumbnailsArray);
  const onImageFiltersFormClick = (evt) => {
    const thumbnailsArrayCopy = thumbnailsArray.slice();
    const randomArray = [];
    let i = MAX_RANDOM_COUNT_VALUE;
    let thumbnails;
    switch(evt.target){
      case defaultFilter:
        setActiveFilterButton(defaultFilter);
        thumbnails = thumbnailsArray;
        break;

      case randomFilter:
        while(i > 0) {
          const randomThumbnails = getRandomArrayElement(thumbnailsArrayCopy);
          if(!randomArray.includes(randomThumbnails)){
            randomArray.push(randomThumbnails);
            i--;
          }
        }
        setActiveFilterButton(randomFilter);
        thumbnails = randomArray;
        break;

      case discussedFilter :
        setActiveFilterButton(discussedFilter);
        thumbnails = thumbnailsArrayCopy.sort(compareCommentsLength);
        break;

    }
    renderThumbnails(thumbnails);
  };
  imageFilters.classList.remove('img-filters--inactive');
  imageFiltersForm.addEventListener('click', debounce(onImageFiltersFormClick));
};

export {setDisplayFilters};
