"use strict";

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
class Card {
  constructor(data, CardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = CardSelector;
  }

  _setEventListeners() {
    this._element.addEventListener("click", () => {
    addImage.src = this._link;
    addImage.alt = this._name;
    addSubtitle.textContent = this._name;
    openPopup(imagePopup);
    });
    this._element
    .querySelector(".elements__remove")
    .addEventListener("click", () => {
      this._element.remove();
    });
    this._element
    .querySelector(".elements__likes")
    .addEventListener("click", (e) => {
      e.target.classList.toggle("elements__likes_active");
    });
  }

  _getTemplate() {
    const cardElements = document.querySelector(this._cardSelector).content
    .querySelector(".elements__item")
    .cloneNode(true);
    return cardElements;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__title").textContent = this._name;
    const imageElement = this._element.querySelector(".elements__image");
    imageElement.src = this._link;
    imageElement.alt = this._name;
    return this._element;
  }

}

const renderElement = () => {
  initialCards.forEach(item => {
    const card = new Card(item, ".template-item");
    const cardElement = card.generateCard();
    templateContainer.append(cardElement);
  });
}
renderElement();
