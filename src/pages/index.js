'use strict'
import {nameInput, jobInput, btnAvatar, templateSelector, btnEdit, btnAdd} from '../utils/constants.js'
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import {renderLoading} from '../utils/renderLoading.js';
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

let userId = null;

const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item, ".template-item");
    cardList.addItem(card, 'end');
  }
}, templateSelector)

Promise.all([api.getInitialCards(), api.getProfileInfo()])
.then(([initialCards, userData]) => {
  userInfo.setUserInfo({
    profileName: userData.name,
    profileAboutName: userData.about,
    profileImage: userData.avatar
  })
  getIdUser(userData._id)
  cardList.rendererItems(initialCards);
})

const getIdUser = (idUser) => {
  userId = idUser;
};

const createCard = (item, cardSelector) => {
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
    userData: userId
  });
  return card.getCard();
}

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
      popupProfileForm.close();
    })
    .catch(err => console.log(`Ошибка при обновлении информации о пользователе: ${err}`))
    .finally(() => {
      renderLoading(".popup_profile", false, 'Сохранить');
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
  popupProfileForm.open();
});

const popupNewPlaceForm = new PopupWithForm(".popup_newplaces", {
  handleFormSubmit: (formData) => {
    renderLoading(".popup_newplaces", true);
    api.addNewCard({
      name: formData.name,
      link: formData.link
    })
    .then(item => {
      const card = createCard(item, ".template-item");
      cardList.addItem(card, 'start');
      renderLoading(".popup_newplaces", true);
      popupNewPlaceForm.close();
    })
    .catch(err => {
      console.log(`${err}`);
    })
    .finally(() => {
      renderLoading(".popup_newplaces", false, 'Создать');
    })
  }}
)

btnAdd.addEventListener("click", () => {
  newPlacesFormValidator.resetValidation();
  popupNewPlaceForm.open();
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
    })
    .catch(err => {
      console.log(`${err}`);
    })
    .finally(() => {
      renderLoading(".popup_avatar", false, 'Сохранить');
    })
  }
})

btnAvatar.addEventListener("click", () => {
  newAvatarFormValidator.resetValidation()
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

const popupWithImage = new PopupWithImage('.popup_openimg');
const profileFormValidator = new FormValidator(validationConfig, ".popup__form_profile");
const newPlacesFormValidator = new FormValidator(validationConfig, ".popup__new-form");
const newAvatarFormValidator = new FormValidator(validationConfig, ".popup__new-avatar");
const confirmFormValidator = new FormValidator(validationConfig, ".popup__form_confirm");
profileFormValidator.enableValidation();
newPlacesFormValidator.enableValidation();
newAvatarFormValidator.enableValidation();
confirmFormValidator.enableValidation();
popupProfileForm.setEventListeners();
popupNewPlaceForm.setEventListeners();
popupWithImage.setEventListeners();
popupWithSubmit.setEventListeners();
popupNewAvatar.setEventListeners();

