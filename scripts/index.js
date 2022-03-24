"use strict"
// Находим элементы попапа и формы
const popup = document.querySelector('.popup'),
      newPlaces = document.querySelector('.popup__new-places'),
      popupClose = document.querySelectorAll('.popup__close'),
      likeButton = document.querySelectorAll('.elements__likes'),
      formElement = popup.querySelector('.popup__form'),
      nameInput = formElement.querySelector('.popup__input_type_username'),
      jobInput = formElement.querySelector('.popup__input_type_userjob'),
      btnEdit = document.querySelector('.profile__edit-button'),
      btnAdd = document.querySelector('.profile__add-button'),
      profileName = document.querySelector('.profile__title'),
      jobName = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
}

function openPopupNewPlace() {
  newPlaces.classList.add('popup_opened');
}

function likeActive() {
  likeButton.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('elements__likes_active');
    })
  });
}
likeActive()

function closePopup() {
  popupClose.forEach(item => {
    item.addEventListener('click', () => {
      popup.classList.remove('popup_opened');
      newPlaces.classList.remove('popup_opened');
    });
  });
}
closePopup()

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    jobName.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
btnEdit.addEventListener('click', openPopup);
btnAdd.addEventListener('click', openPopupNewPlace);

