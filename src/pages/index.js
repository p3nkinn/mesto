'use strict'
import {nameInput, jobInput, profileImage, templateSelector, btnEdit, btnAdd, profileName, jobName, templateContainer} from '../utils/constants.js'
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {validationConfig} from '../utils/validationConfig.js';
import Api from '../components/Api.js';
import '../pages/index.css';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '9b46d791-fb3a-4f6c-afe0-1b838c18e4bc',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getProfileInfo(), api.getInitialCards()])
.then(([userData, initialCards]) => {
  userInfo.setUserInfo({
    profileName: userData.name,
    profileAboutName: userData.about,
    profileImage: userData.avatar
  })
  const id = userData._id;
  const cardList = new Section({
    data: initialCards,
    renderer: (item, userData) => {
      const card = createCard(item, ".template-item", userData)
      card.checkId(id);
      const cardElement = card.getCard();
      cardList.addItem(cardElement);
    }
  }, templateSelector);

  cardList.renderer();
})




const createCard = (item, cardSelector, userData) => {
  const card = new Card(item, cardSelector, {
    handleCardClick: (name, link) => {
      popupWithImage.open({name, link});
    },
    handleCardRemove: (id, item) => {
      popupWithSubmit.open()
      api.deleteCard(id)
      .then(() => {
        item.remove();
        popupWithSubmit.close();
      });
    },
    handleCardLikes: (id) => {
      if(card.checkLike()) {
        api.addLike(id)
        .then(data => {
          card.setLikes(data);
        })
       } else {
       api.removeLike(id)
         .then(data => {
          card.setLikes(data);
      })
      }
    },
    userData: userData
  });
  return card;
}

// const renderCard = (item) => {
//   const cardElement = createCard(item);
//   templateContainer.prepend(cardElement);
// };

const popupProfileForm = new PopupWithForm(".popup_profile", {
  handleFormSubmit: (userData) => {
    api.setProfileInfo(userData)
    .then(data => {
      const newData = {
        profileName: data.name,
        profileAboutName: data.about,
        profileImage: data.avatar
      }
      userInfo.setUserInfo(newData);
      openprofilePopup.close();
    })
    .catch(err => console.log(`Ошибка при обновлении информации о пользователе: ${err}`))
}
});

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__subtitle",
  profileImage: ".profile__image"
});


btnEdit.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.profileName;
  jobInput.value = userData.profileAboutName;
  openprofilePopup.open()
});

const popupNewPlaceForm = new PopupWithForm(".popup_newplaces", {
  handleFormSubmit: (formData) => {
    api.addNewCard({
      name: formData.name,
      link: formData.link
    })
    .then(data => {
      const card = new Card(data, ".template-item", userInfo.getUserInfo())
      const cardElement = card.getCard();

      popupNewPlaceForm.close();
    });
  }}

)

btnAdd.addEventListener("click", () => {
  newPlacesFormValidator.resetValidation();
  popupNewPlace.open();
});

const popupNewPlace = new Popup(".popup_newplaces");
const openprofilePopup = new Popup(".popup_profile");
const popupWithImage = new PopupWithImage('.popup_openimg')
const popupWithSubmit = new PopupWithSubmit('.popup_confirm')
const profileFormValidator = new FormValidator(validationConfig, ".popup__form_profile");
const newPlacesFormValidator = new FormValidator(validationConfig, ".popup__new-form");
profileFormValidator.enableValidation();
newPlacesFormValidator.enableValidation();
popupProfileForm.setEventListeners();
popupNewPlaceForm.setEventListeners();
popupNewPlace.setEventListeners();
popupWithImage.setEventListeners();
popupWithSubmit.setEventListeners();

