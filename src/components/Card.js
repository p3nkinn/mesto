export default class Card {
  constructor(data, cardSelector, {handleCardClick, handleCardRemove, handleCardLikes, userData}) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._userData = userData;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardRemove =  handleCardRemove;
    this._handleCardLikes = handleCardLikes;
  }

  _createCard = () => {
    this._cardElement = document.querySelector(this._cardSelector).content
    .querySelector(".elements__item")
    .cloneNode(true);
  }

  checkId = (id) => {
    this._userData = id;
  }

  _checkRemove = () => {
    if(this._data.owner._id == this._userData) {
      this._cardElement
      .querySelector(".elements__remove").classList.add("elements__remove_active")
    }
  }

  isLike = () => {
    return this._data.likes.find(likes => likes._id === this._userData);
  }

  _checkLike = () => {
    if (this.isLike()) {
      this.addLikes();
    } else {
      this.delLikes();
    }
  }

  addLikes = () => {
    this._cardElement.querySelector(".elements__likes").classList.add("elements__likes_active");
  }

  delLikes = () => {
    this._cardElement.querySelector(".elements__likes").classList.remove("elements__likes_active");
  }

  setLikes = (data) => {
    this._data = data;
    this._cardElement.querySelector(".elements__likes_count").textContent = this._data.likes.length;
  }


  _setEventListeners = () => {
    this._cardElement
    .querySelector(".elements__remove")
    .addEventListener("click", () => this._handleCardRemove(this._cardElement, this._data._id));
    this._cardElement
    .querySelector(".elements__likes")
    .addEventListener("click", () => this._handleCardLikes(this._data._id));
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
    this._checkRemove();
    this.setLikes(this._data);
    this._checkLike();
    return this._cardElement;
  }
}
