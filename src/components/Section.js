export default class Section {
  constructor({data, renderer}, containerSelector) {
    this._initialCards = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    this._initialCards.forEach(item => {
      this._renderer(item);
    })
  }

  setRenderedItems(data) {
    this._initialCards = data;
  }

  addItem (element, place) {
    if (place === 'start') {
      this._container.prepend(element);
  } else if (place === 'end') {
      this._container.append(element);
    }
  }
}
