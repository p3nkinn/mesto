export default class Section {
  constructor({data, renderer}, containerSelector) {
    this._initialCards = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer(userData) {
    this._initialCards.forEach(item => {
      this._renderer(item, userData);
    })
  }

  addItem(element) {
    this._container.append(element);
  }
}
