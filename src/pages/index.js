'use strict'
import {nameInput, jobInput, templateSelector, btnEdit, btnAdd, profileName, jobName, templateContainer} from '../utils/constants.js'
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../utils/initialCards.js'
import {validationConfig} from '../utils/validationConfig.js';
import '../pages/index.css';

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, ".template-item", handleCardClick);
    const cardElement = card.getCard();
    cardList.addItem(cardElement);
  }
}, templateSelector);

const createCard = (item) => {
  const card = new Card(item, ".template-item", handleCardClick);
  const cardElement = card.getCard(item);
  return cardElement;
}

const renderCard = (item) => {
  const cardElement = createCard(item);
  templateContainer.prepend(cardElement);
};

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__subtitle"
});

const popupWithImage = new PopupWithImage('.popup_openimg')
 const handleCardClick = (name, link) => {
  popupWithImage.open({name, link});
}


const popupProfileForm = new PopupWithForm(".popup_profile", {
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo(userData);
    profileName.textContent = userData.username;
    jobName.textContent = userData.userjob;
    openprofilePopup.close();
}
});

btnEdit.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  nameInput.value = userInfo.getUserInfo().profileName;
  jobInput.value = userInfo.getUserInfo().jobName;
  openprofilePopup.open()
});

const popupNewPlaceForm = new PopupWithForm(".popup_newplaces", {
  handleFormSubmit: (formData) => {
    const item = {
      name: formData.name,
      link: formData.link
    }
    renderCard(item)
    popupNewPlaceForm.close();
  }}
)

btnAdd.addEventListener("click", () => {
  newPlacesFormValidator.resetValidation();
  popupNewPlace.open();
});

cardList.renderer();

const popupNewPlace = new Popup(".popup_newplaces");
const openprofilePopup = new Popup(".popup_profile");
const profileFormValidator = new FormValidator(validationConfig, ".popup__form_profile");
const newPlacesFormValidator = new FormValidator(validationConfig, ".popup__new-form");
profileFormValidator.enableValidation();
newPlacesFormValidator.enableValidation();
popupProfileForm.setEventListeners();
popupNewPlaceForm.setEventListeners();
popupNewPlace.setEventListeners();
popupWithImage.setEventListeners();
