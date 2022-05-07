'use strict'
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initialCards.js';
import {validationConfig} from './validationConfig.js';

// Попап редактирования профиля
const popups = document.querySelectorAll('.popup'),
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
  addImage = imagePopup.querySelector(".popup__image"),
  addSubtitle = imagePopup.querySelector(".popup__subtitle"),
  templateContainer = document.querySelector(".elements__list");


const openProfilePopup = () => {
  profileFormValidator.resetValidation();
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
};

const openPopupNewPlace = () => {
  newPlacesFormValidator.resetValidation()
  openPopup(newPlaces);

};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscape);
}

const handleCardClick = (name, link) => {
  addImage.src = link;
  addImage.alt = name;
  addSubtitle.textContent = name;
  openPopup(imagePopup);
}

const submitProfileForm = (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
  closePopup(profilePopup);
};

// Закрытие попап вне элемента

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup__container')) {
          closePopup(popup)
      }
      if (e.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  });
});

// Закртыие попап на ESC

const handleEscape = (e) => {
  if (e.key === "Escape") {
    const currentPopup = document.querySelector(".popup_opened");
    closePopup(currentPopup);
  }
};

const createCard = (item) => {
  const card = new Card(item, ".template-item", handleCardClick);
  const cardElement = card.getCard(item);
  return cardElement;
}

const renderCard = (item) => {
  const cardElement = createCard(item);
  templateContainer.prepend(cardElement);
};

const renderElements = () => {
  initialCards.map((item) => {
    const cardElement = createCard(item);
    templateContainer.append(cardElement);
  });
  }
  renderElements()

const handleCardFormSubmit = (e) => {
  e.preventDefault();
  const item = {};
  item.link = linkNameForm.value;
  item.name = titleNameForm.value;
  renderCard(item);
  newPlacesForm.reset();
  newPlacesFormValidator.disableButton();
  closePopup(newPlaces);
};

profileForm.addEventListener("submit", submitProfileForm);
newPlacesForm.addEventListener('submit', handleCardFormSubmit);
btnEdit.addEventListener("click", openProfilePopup);
btnAdd.addEventListener("click", openPopupNewPlace);


const profileFormValidator = new FormValidator(validationConfig, ".popup__form_profile");
const newPlacesFormValidator = new FormValidator(validationConfig, ".popup__new-form");
profileFormValidator.enableValidation();
newPlacesFormValidator.enableValidation();



