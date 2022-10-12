const elementCreator = (element, elementClass) => {
  const object = document.createElement(element);
  object.classList.add(elementClass);
  if (object === 'img') {
    object.width = '35';
    object.height = '35';
  }
  return object;
};

export {elementCreator};
