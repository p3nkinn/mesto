"use strict"
      // Попап редактирования профиля
const profilePopup = document.querySelector('.popup_profile'),
      popupClose = document.querySelectorAll('.popup__close'),
      profileForm = profilePopup.querySelector('.popup__form_profile'),
      nameInput = profileForm.querySelector('.popup__input_type_username'),
      jobInput = profileForm.querySelector('.popup__input_type_userjob'),
      btnEdit = document.querySelector('.profile__edit-button'),
      profileName = document.querySelector('.profile__title'),
      jobName = document.querySelector('.profile__subtitle'),
    // Форма с добавлением картинки и описания
      newPlaces = document.querySelector('.popup_newplaces'),
      newPlacesForm = newPlaces.querySelector('.popup__new-form'),
      btnAdd = document.querySelector('.profile__add-button'),
      titleNameForm = document.querySelector('.popup__input_type_title'),
      linkNameForm = document.querySelector('.popup__input_type_link'),
      formImage = document.querySelector('.popup_openimg'),
      addImage = formImage.querySelector('.popup__image'),
      addSubtitle = formImage.querySelector('.popup__subtitle');

      // Создаем карточки массива initialCards
const templateContainer = document.querySelector('.elements__list');
const createCard = (itemCard) => {
  const template = document.querySelector('.template-item').content;
  const cardElements = template.querySelector('.elements__item').cloneNode(true);
        cardElements.querySelector('.elements__title').textContent = itemCard.name;
        cardElements.querySelector('.elements__image').src = itemCard.link;
        cardElements.querySelector('.elements__image').addEventListener('click', () => {
          addImage.src = itemCard.link;
          addSubtitle.textContent = itemCard.name;
          openPopup(formImage);
        });
        cardElements.src = itemCard.link
        cardElements.querySelector('.elements__remove').addEventListener('click', () => {
            cardElements.remove();
        });
        cardElements.querySelector('.elements__likes').addEventListener('click', (e) => {
            e.target.classList.toggle('elements__likes_active');
        });
        return cardElements;
};

const renderCard = (itemCard) => {
  templateContainer.prepend(createCard(itemCard));
};

const elements = initialCards.map(itemCard => {
  return createCard(itemCard);
});

templateContainer.append(...elements);

const openProfilePopup = () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

}

popupClose.forEach(item => {
  item.addEventListener('click', () => {
    closePopup(profilePopup);
  });
  item.addEventListener('click', () => {
    closePopup(newPlaces);
  });
  item.addEventListener('click', () => {
    closePopup(formImage);
  });
});

const openPopupNewPlace = () => {
 openPopup(newPlaces);
}

const submitProfileForm = (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
  closePopup(profilePopup);
}

const formSubmitEditForm = (e) => {
  e.preventDefault();
  const itemCard = initialCards;
  initialCards.link = linkNameForm.value;
  initialCards.name = titleNameForm.value;
  linkNameForm.value = '';
  titleNameForm.value = '';
  renderCard(itemCard);
  closePopup(newPlaces);
};

profileForm.addEventListener('submit', submitProfileForm);
newPlacesForm.addEventListener('submit' , formSubmitEditForm);
btnEdit.addEventListener('click', openProfilePopup);
btnAdd.addEventListener('click', openPopupNewPlace);
