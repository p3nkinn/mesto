'use strict'
import {nameInput, jobInput, templateSelector, btnEdit, btnAdd, profileName, jobName, templateContainer} from '../utils/variables.js'
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../components/initialCards.js';
import {validationConfig} from '../components/validationConfig.js';
import '../pages/index.css';


const handleCardClick = (name, link) => {
  const popupWithImage = new PopupWithImage({name, link},'.popup_openimg');
  popupWithImage.open();
  popupWithImage.setEventListeners();
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, ".template-item", handleCardClick);
    const cardElement = card.getCard(item);
    cardList.addItem(cardElement);
  }
}, templateSelector);

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__subtitle"
});

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
    const card = new Card(item, ".template-item", handleCardClick);
    const cardElement = card.getCard();
    templateContainer.prepend(cardElement);
    popupNewPlaceForm.close();
  }}
)

btnAdd.addEventListener("click", () => {
  newPlacesFormValidator.resetValidation();
  popupNewPlace.open();
  popupNewPlace.setEventListeners();
});

cardList.renderer();

const popupNewPlace = new Popup(".popup_newplaces");
const openprofilePopup = new Popup(".popup_profile");
const profileFormValidator = new FormValidator(validationConfig, ".popup__form_profile");
const newPlacesFormValidator = new FormValidator(validationConfig, ".popup__new-form");
profileFormValidator.enableValidation();
newPlacesFormValidator.enableValidation();
popupProfileForm.setEventListeners()
popupNewPlaceForm.setEventListeners();
