export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _createCard = () => {
    this._cardElement = document.querySelector(this._cardSelector).content
    .querySelector(".elements__item")
    .cloneNode(true);
  }

  _buttonLike = () => {
    this._cardElement.querySelector(".elements__likes").classList.toggle("elements__likes_active");
  }

  _removeCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners = () => {
    this._cardElement
    .querySelector(".elements__remove")
    .addEventListener("click", this._removeCard);
    this._cardElement
    .querySelector(".elements__likes")
    .addEventListener("click", this._buttonLike);

    this._cardImage
    .addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  getCard = () => {
    this._createCard();
    this._cardImage = this._cardElement.querySelector(".elements__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".elements__title").textContent = this._name;
    this._setEventListeners();

    return this._cardElement;
  }
}
