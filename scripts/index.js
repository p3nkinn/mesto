"use strict"

const popup = document.querySelector('.popup'),
      popupClose = popup.querySelector('.popup__close'),
      formElement = popup.querySelector('.popup__container'),
      nameInput = formElement.querySelector('.popup__name'),
      jobInput = formElement.querySelector('.popup__jobname'),
      btnEdit = document.querySelector('.profile__button-edit'),
      nameForm = document.querySelector('.profile__title'),
      jobForm = document.querySelector('.profile__subtitle');

function popupOpen() {
  popup.classList.add('popup_opened');
}
function popupClosed() {
  popup.classList.remove('popup_opened');
}

nameInput.value = nameForm.innerHTML;
jobInput.value = jobForm.innerHTML;

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameForm.textContent = nameInput.value;
    jobForm.textContent = jobInput.value;
    popupClosed();
}

formElement.addEventListener('submit', formSubmitHandler);
btnEdit.addEventListener('click', popupOpen);
popupClose.addEventListener('click', popupClosed);