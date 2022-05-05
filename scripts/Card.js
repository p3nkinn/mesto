export default class Card {
  constructor(data, CardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = document.querySelector(CardSelector);
    this._handleCardClick = handleCardClick;
  }

  _createCard = () => {
    this._card = document.querySelector('.template-item').content
    .querySelector(".elements__item")
    .cloneNode(true);
  }

  _setEventListeners = () => {
    this._card
    .querySelector(".elements__remove")
    .addEventListener("click", () => {
      this._card.remove();
    });
    this._card
    .querySelector(".elements__likes")
    .addEventListener("click", (e) => {
      e.target.classList.toggle("elements__likes_active");
    });
    this._cardImage = this._card.querySelector(".elements__image")
    .addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });

  }

  getCard = () => {
    this._createCard();
    this._setEventListeners();
    this._card.querySelector(".elements__title").textContent = this._name;
    this._cardImage = this._card.querySelector(".elements__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    return this._card;
  }
}
