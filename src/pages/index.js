'use strict'
import {nameInput, jobInput, btnAvatar, templateSelector, btnEdit, btnAdd, templateContainer, cardSelector} from '../utils/constants.js'
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

const renderLoading = (popup, isLoading) => {
  const button = document.querySelector(popup).querySelector('.popup__button');
  if (isLoading) {
    button.textContent = 'Загрузка...';
  } else {
    button.textContent = 'Сохранить...';
  }
}

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
    renderer: (item) => {
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
    handleCardRemove: (item, id) => {
      popupWithSubmit.open({item, id})
    },
    handleCardLikes: (id) => {
      if (card.isLike()) {
        api.removeLike(id)
          .then((data) => {
            card.delLikes();
            card.setLikes(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        api.addLike(id)
          .then((data) => {
            card.addLikes();
            card.setLikes(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    userData: userData
  });

  return card;
}

// const initCard = new Section({
//   data: [],
//   renderer: (item, userData) => {
//     const card = createCard(item, ".template-item", userData);
//     const cardElement = card.getCard();
//     initCard.addItem(cardElement);
//   }
// }, templateSelector)

const addCard = (item, userData) => {
  const card = createCard(item, ".template-item", userData);
  const cardElement = card.getCard(item);
  return cardElement;

}

const renderCard = (item, userData) => {
  const cardElement = addCard(item, userData);
  templateContainer.prepend(cardElement);
};


const popupProfileForm = new PopupWithForm(".popup_profile", {
  handleFormSubmit: (userData) => {
    renderLoading(".popup_profile", true);
    api.setProfileInfo(userData)
    .then(data => {
      const newData = {
        profileName: data.name,
        profileAboutName: data.about,
        profileImage: data.avatar
      }
      userInfo.setUserInfo(newData);
      openprofilePopup.close();
      renderLoading(".popup_profile", false);
    })
    .catch(err => console.log(`Ошибка при обновлении информации о пользователе: ${err}`))
    .finally(() => {
      renderLoading(".popup_profile", false);
    })
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
    renderLoading(".popup_newplaces", true);
    api.addNewCard(formData)
    .then(formData => {
      const item = {
        name: formData.name,
        link: formData.link,
        owner: formData.owner._id,
        likes: formData.likes,
      }
      const card = createCard(item, ".template-item");
      const cardElement = card.getCard()
      templateContainer.prepend(cardElement);
      renderLoading(".popup_newplaces", false);
      popupNewPlaceForm.close();
    })
    .catch(err => {
      console.log(`${err}`);
    })
    .finally(() => {
      renderLoading(".popup_newplaces", false);
    })
  }}
)

btnAdd.addEventListener("click", () => {
  newPlacesFormValidator.resetValidation();
  popupNewPlace.open();
});

const popupNewAvatar = new PopupWithForm(".popup_avatar", {
  handleFormSubmit: (userData) => {
    renderLoading(".popup_avatar", true);
    api.addNewAvatar(userData)
    .then(userData => {
      userInfo.setAvatar({
        profileImage: userData.avatar
      })
      popupNewAvatar.close();
      renderLoading(".popup_avatar", false);
    })
    .catch(err => {
      console.log(`${err}`);
    })
    .finally(() => {
      renderLoading(".popup_avatar", false);
    })
  }
})

btnAvatar.addEventListener("click", () => {
  popupNewAvatar.open();
})

const popupWithSubmit = new PopupWithSubmit('.popup_confirm', {
  handleFormSubmit: ({item, id}) => {
    api.deleteCard(id)
    .then(() => {
      item.remove();
      popupWithSubmit.close();
    })
    .catch(err => {
      console.log(`${err}`)
    })
  }
});

const popupNewPlace = new Popup(".popup_newplaces");
const openprofilePopup = new Popup(".popup_profile");
const popupWithImage = new PopupWithImage('.popup_openimg');
const profileFormValidator = new FormValidator(validationConfig, ".popup__form_profile");
const newPlacesFormValidator = new FormValidator(validationConfig, ".popup__new-form");
const newAvatarFormValidator = new FormValidator(validationConfig, ".popup__new-avatar");
const deleteCard = new FormValidator(validationConfig, ".popup__form_confirm");
profileFormValidator.enableValidation();
newPlacesFormValidator.enableValidation();
newAvatarFormValidator.enableValidation();
deleteCard.enableValidation();
popupProfileForm.setEventListeners();
popupNewPlaceForm.setEventListeners();
popupNewPlace.setEventListeners();
popupWithImage.setEventListeners();
popupWithSubmit.setEventListeners();
popupNewAvatar.setEventListeners();

