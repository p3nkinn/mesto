"use strict"
// Находим элементы попапа и формы
const popup = document.querySelector('.popup'),
      popupClose = popup.querySelector('.popup__close'),
      formElement = popup.querySelector('.popup__form'),
      nameInput = formElement.querySelector('.popup__input_type_username'),
      jobInput = formElement.querySelector('.popup__input_type_userjob'),
      btnEdit = document.querySelector('.profile__edit-button'),
      profileName = document.querySelector('.profile__title'),
      jobName = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    jobName.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
btnEdit.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
