"use strict"

    // Попап редактирования профиля
const popup = document.querySelector('.popup'),
      popupClose = document.querySelectorAll('.popup__close'),
      formElement = popup.querySelector('.popup__form'),
      nameInput = formElement.querySelector('.popup__input_type_username'),
      jobInput = formElement.querySelector('.popup__input_type_userjob'),
      btnEdit = document.querySelector('.profile__edit-button'),
      profileName = document.querySelector('.profile__title'),
      jobName = document.querySelector('.profile__subtitle'),
    // Форма с добавлением картинки и описания
      newPlaces = document.querySelector('.popup__newplaces'),
      newPlacesForm = newPlaces.querySelector('.popup__new-form'),
      btnAdd = document.querySelector('.profile__add-button'),
      titleNameForm = document.querySelector('.popup__input_type_title'),
      linkNameForm = document.querySelector('.popup__input_type_link'),
      formImage = document.querySelector('.popup__openimg'),
      addImage = formImage.querySelector('.popup__image'),
      addSubtitle = formImage.querySelector('.popup__subtitle');


const initialCards = [
  {
    name: 'Бургер',
    link: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80'
  },
  {
    name: 'Паста',
    link: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },
  {
    name: 'Хачапури',
    link: 'https://images.unsplash.com/photo-1612950365425-dbf12ef9a1a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Биг Мак',
    link: 'https://images.unsplash.com/photo-1548946522-4a313e8972a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80'
  },
  {
    name: 'Чизкейк',
    link: 'https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=775&q=80'
  },
  {
    name: 'Говяжий стейк',
    link: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
];
      // Создаем карточки массива initialCards
const templateContainer = document.querySelector('.elements__list');

const createCard = (itemCard) => {
  const template = document.querySelector('.template-item').content;
  const cardElements = template.querySelector('.elements__item').cloneNode(true);
        cardElements.querySelectorAll('.elements__image').forEach(item => {
          item.src = itemCard.link;
          item.addEventListener('click',() => {
            formImage.classList.add('popup_opened');
            addImage.src = itemCard.link;
            addSubtitle.textContent = itemCard.name;
          });
        });
        cardElements.querySelector('.elements__title').textContent = itemCard.name;
        cardElements.querySelectorAll('.elements__remove').forEach(item => {
          item.addEventListener('click', (e) => {
            e.preventDefault();
            item.closest('.elements__item');
            cardElements.remove();
          });
        });
        cardElements.querySelectorAll('.elements__likes').forEach(item => {
          item.addEventListener('click', () => {
            item.classList.toggle('elements__likes_active');
          });
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

const openPopup = () => {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
}

const openPopupNewPlace = () => {
  newPlaces.classList.add('popup_opened');
}

const closePopup = () => {
  popupClose.forEach(item => {
    item.addEventListener('click', () => {
      popup.classList.remove('popup_opened');
      newPlaces.classList.remove('popup_opened');
      formImage.classList.remove('popup_opened');
    });
  });
}
closePopup()

const formSubmitHandler = (e) => {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    jobName.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

const formSubmitEditForm = (e) => {
  e.preventDefault();
  const itemCard = initialCards;
  initialCards.link = linkNameForm.value;
  initialCards.name = titleNameForm.value;
  linkNameForm.value = '';
  titleNameForm.value = '';
  renderCard(itemCard);
  newPlaces.classList.remove('popup_opened');
};

formElement.addEventListener('submit', formSubmitHandler);
newPlacesForm.addEventListener('submit' , formSubmitEditForm);
btnEdit.addEventListener('click', openPopup);
btnAdd.addEventListener('click', openPopupNewPlace);
