"use strict";
import Card from './Card.js';
import formValidator from './FormValidator.js';
export {popupImageOpen , closePopup, newPlaces}



// Попап редактирования профиля
const profilePopup = document.querySelector(".popup_profile"),
  profileClose = profilePopup.querySelector(".popup__close_profile"),
  profileForm = profilePopup.querySelector(".popup__form_profile"),
  nameInput = profileForm.querySelector(".popup__input_type_username"),
  jobInput = profileForm.querySelector(".popup__input_type_userjob"),
  btnEdit = document.querySelector(".profile__edit-button"),
  profileName = document.querySelector(".profile__title"),
  jobName = document.querySelector(".profile__subtitle"),
  // Форма с добавлением картинки и описания
  newPlaces = document.querySelector(".popup_newplaces"),
  newPlacesClose = newPlaces.querySelector(".popup__close_newplaces"),
  btnAdd = document.querySelector(".profile__add-button"),
  imagePopup = document.querySelector(".popup_openimg"),
  addImage = imagePopup.querySelector(".popup__image"),
  imagePopupClose = imagePopup.querySelector(".popup__close_openimg"),
  addSubtitle = imagePopup.querySelector(".popup__subtitle");


const openProfilePopup = () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscape);
}

profileClose.addEventListener("click", () => {
  closePopup(profilePopup);
});

newPlacesClose.addEventListener("click", () => {

  closePopup(newPlaces);
});

imagePopupClose.addEventListener("click", () => {
  closePopup(imagePopup);
});

const openPopupNewPlace = () => {
  openPopup(newPlaces);
};

const popupImageOpen = (name, link) => {
  openPopup(imagePopup);
  addImage.src = link;
  addImage.alt = name;
  addSubtitle.textContent = name;
}

const submitProfileForm = (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
  closePopup(profilePopup);
};

// Закрытие попап вне элемента

const popupList = Array.from(document.querySelectorAll(".popup"));
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("popup__container")) {
      closePopup(popup);
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

profileForm.addEventListener("submit", submitProfileForm);
btnEdit.addEventListener("click", openProfilePopup);
btnAdd.addEventListener("click", openPopupNewPlace);


