export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
  }

  _createCard = () => {
    this._cardSelector = document.querySelector('.template-item').content
    .querySelector(".elements__item")
    .cloneNode(true);
  }

  _setEventListeners = () => {
    this._cardSelector
    .querySelector(".elements__remove")
    .addEventListener("click", () => {
    this._cardSelector.remove();
    });
    this.likeButton = this._cardSelector
    .querySelector(".elements__likes")
    .addEventListener("click", (e) => {
    e.target.classList.toggle("elements__likes_active");
    });
    this._cardImage
    .addEventListener('click', () => {
    this._handleCardClick(this._name, this._link);
    });
  }

  getCard = () => {
    this._createCard();
    this._cardImage = this._cardSelector.querySelector(".elements__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardSelector.querySelector(".elements__title").textContent = this._name;
    this._setEventListeners();

    return this._cardSelector;
  }
}
