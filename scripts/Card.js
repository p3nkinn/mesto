"use strict";
import {popupImageOpen , closePopup, newPlaces} from './index.js'
import FormValidator, {buttonDisabled} from './FormValidator.js'

const initialCards = [
  {
    name: 'Бургер',
    link: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80'
  },
  {
    name: 'Паста',
    link: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },
  {
    name: 'Хачапури',
    link: 'https://images.unsplash.com/photo-1612950365425-dbf12ef9a1a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Биг Мак',
    link: 'https://images.unsplash.com/photo-1548946522-4a313e8972a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80'
  },
  {
    name: 'Чизкейк',
    link: 'https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=775&q=80'
  },
  {
    name: 'Говяжий стейк',
    link: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
];
const templateContainer = document.querySelector(".elements__list");
export default class Card {
  constructor(CardSelector) {
    this._cardSelector = document.querySelector(CardSelector);
  }

  addCard = (card) => {
    this._cardSelector.prepend(card);
  }
}

class CardListItem {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _createCard = () => {
    this._card = document.querySelector('.template-item').content
    .querySelector(".elements__item")
    .cloneNode(true);
  }

  _setEventListeners() {
    this._card
    .querySelector(".elements__image")
    .addEventListener("click", () => {
    popupImageOpen(this._name, this._link);
    });
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

class CardForm {
  constructor(formSelector, onAddItem) {
    document.querySelector(formSelector).addEventListener('submit', this._handleCardFormSubmit);
    this._onAddItem = onAddItem;
  }

  _handleCardFormSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    this._onAddItem(data);
    e.target.reset();
    buttonDisabled.disableButton(newPlaces);
    closePopup(newPlaces);


  }
}

const card = new Card('.elements__list');

new CardForm('.popup__new-form', (data) => {
  const item = new CardListItem(data)
  card.addCard(item.getCard());
});

const renderElements = () => {
  initialCards.map((item) => {
  const card = new CardListItem(item, ".template-item")
  const cardElement = card.getCard(item);
  templateContainer.append(cardElement);
});
};
renderElements()
