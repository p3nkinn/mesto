"use strict"

const popup = document.querySelector('.popup'),
      popupClose = document.querySelector('.popup__close'),
      btnEdit = document.querySelector('.profile__button-edit');

btnEdit.addEventListener('click', () => {
  popup.classList.add('popup_opened');
});

popupClose.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
})
