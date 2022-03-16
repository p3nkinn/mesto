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
  document.addEventListener('keyup', onDocumentKeyUp);
}
function popupClosed() {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
}

nameInput.value = nameForm.innerHTML;
jobInput.value = jobForm.innerHTML;

function onDocumentKeyUp (e) {
  if (e.key === ESC_KEY) {
    popupClosed();
  }
  else if (e.key === ENT_KEY) {
    popupClosed();
  }
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameForm.textContent = nameInput.value;
    jobForm.textContent = jobInput.value;
    document.addEventListener('keyup', onDocumentKeyUp);

}

formElement.addEventListener('submit', formSubmitHandler);
btnEdit.addEventListener('click', popupOpen);
popupClose.addEventListener('click', popupClosed);
document.addEventListener('keyup', onDocumentKeyUp);
const ESC_KEY = "Escape";
const ENT_KEY = "Enter";
