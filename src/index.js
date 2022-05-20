'use strict'

import Card from '../scripts/Card.js';
import Section from '../scripts/Section.js';
import Popup from '../scripts/Popup.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import FormValidator from '../scripts/FormValidator.js';
import {initialCards} from '../scripts/initialCards';
import {validationConfig} from '../scripts/validationConfig';
import '../pages/index.css';

// Попап редактирования профиля
const
  profilePopup = document.querySelector(".popup_profile"),
  profileForm = profilePopup.querySelector(".popup__form_profile"),
  nameInput = profileForm.querySelector(".popup__input_type_username"),
  jobInput = profileForm.querySelector(".popup__input_type_userjob"),
  btnEdit = document.querySelector(".profile__edit-button"),
  profileName = document.querySelector(".profile__title"),
  jobName = document.querySelector(".profile__subtitle"),
  // Форма с добавлением картинки и описания
  newPlaces = document.querySelector(".popup_newplaces"),
  newPlacesForm = newPlaces.querySelector(".popup__new-form"),
  titleNameForm = document.querySelector(".popup__input_type_title"),
  linkNameForm = document.querySelector(".popup__input_type_link"),
  btnAdd = document.querySelector(".profile__add-button"),
  imagePopup = document.querySelector(".popup_openimg"),
  templateContainer = document.querySelector(".elements__list"),
  templateSelector = ".elements__list";

const openProfilePopup = () => {
  const profilePopup = new Popup(".popup_profile");
  profileFormValidator.resetValidation();
  profilePopup.open();
  profilePopup.setEventListeners();
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
};

const openPopupNewPlace = () => {
  const popupNewPlace = new Popup(".popup_newplaces");
  newPlacesFormValidator.resetValidation();
  popupNewPlace.open();
  popupNewPlace.setEventListeners();
};

const handleCardClick = (name, link) => {
  const popupWithImage = new PopupWithImage({name, link},'.popup_openimg');
  popupWithImage.open();
  popupWithImage.setEventListeners();
}

const submitProfileForm = (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
};


const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, ".template-item", handleCardClick);
    const cardElement = card.getCard(item);
    cardList.addItem(cardElement);
  }
}, templateSelector);

cardList.renderer();

const createCard = (item) => {
  const card = new Card(item, ".template-item", handleCardClick);
  const cardElement = card.getCard(item);
  return cardElement;
}

const renderCard = (item) => {
  const cardElement = createCard(item);
  templateContainer.prepend(cardElement);
};




// const handleCardFormSubmit = (e) => {
//   e.preventDefault();
//   const item = {};
//   item.link = linkNameForm.value;
//   item.name = titleNameForm.value;
//   renderCard(item);
//   newPlacesForm.reset();
//   newPlacesFormValidator.disableButton();
// };


btnAdd.addEventListener("click", openPopupNewPlace);
btnEdit.addEventListener("click", openProfilePopup);

profileForm.addEventListener("click", () => {
  const popupProfileForm = new PopupWithForm({
    popupSelector: ".popup_profile",
    handleFormSubmit: (formData) => {
      const dataValue = {
        name: formData.username,
        name: formData.userjob
    }

    console.log(formData)
    console.log(dataValue);
  }
  });
  popupProfileForm.setEventListeners()
});

newPlacesForm.addEventListener("click", () => {
  const popupNewPlaceForm = new PopupWithForm({
    popupSelector: ".popup_newplaces",
    handleFormSubmit: (formData) => {
      const dataValue = {
        name: formData.name,
        link: formData.link
    }
    renderCard(item);
    console.log(formData)
    console.log(dataValue);
  }
  });
  popupNewPlaceForm.setEventListeners()
});


const profileFormValidator = new FormValidator(validationConfig, ".popup__form_profile");
const newPlacesFormValidator = new FormValidator(validationConfig, ".popup__new-form");
profileFormValidator.enableValidation();
newPlacesFormValidator.enableValidation();
