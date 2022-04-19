"use strict";

// Попап редактирования профиля
const profilePopup = document.querySelector(".popup_profile"),
  profileClose = profilePopup.querySelector(".popup__close_profile"),
  profileForm = profilePopup.querySelector(".popup__form_profile"),
  nameInput = profileForm.querySelector(".popup__input_type_username"),
  jobInput = profileForm.querySelector(".popup__input_type_userjob"),
  btnEdit = document.querySelector(".profile__edit-button"),
  profileName = document.querySelector(".profile__title"),
  jobName = document.querySelector(".profile__subtitle"),
  // Форма с добавлением картинки и описания
  newPlaces = document.querySelector(".popup_newplaces"),
  newPlacesForm = newPlaces.querySelector(".popup__new-form"),
  newPlacesClose = newPlaces.querySelector(".popup__close_newplaces"),
  btnAdd = document.querySelector(".profile__add-button"),
  titleNameForm = document.querySelector(".popup__input_type_title"),
  linkNameForm = document.querySelector(".popup__input_type_link"),
  imagePopup = document.querySelector(".popup_openimg"),
  addImage = imagePopup.querySelector(".popup__image"),
  imagePopupClose = imagePopup.querySelector(".popup__close_openimg"),
  addSubtitle = imagePopup.querySelector(".popup__subtitle");

// Создаем карточки массива initialCards
const templateContainer = document.querySelector(".elements__list");
const createCard = (itemCard) => {
  const template = document.querySelector(".template-item").content;
  const cardElements = template
    .querySelector(".elements__item")
    .cloneNode(true);
  const imageElement = cardElements.querySelector(".elements__image");
  cardElements.querySelector(".elements__title").textContent = itemCard.name;
  imageElement.src = itemCard.link;
  imageElement.alt = itemCard.name;
  imageElement.addEventListener("click", () => {
    addImage.src = itemCard.link;
    addImage.alt = itemCard.name;
    addSubtitle.textContent = itemCard.name;
    openPopup(imagePopup);
  });
  cardElements
    .querySelector(".elements__remove")
    .addEventListener("click", () => {
      cardElements.remove();
    });
  cardElements
    .querySelector(".elements__likes")
    .addEventListener("click", (e) => {
      e.target.classList.toggle("elements__likes_active");
    });
  return cardElements;
};

const renderCard = (itemCard) => {
  templateContainer.prepend(createCard(itemCard));
};

const elements = initialCards.map((itemCard) => {
  return createCard(itemCard);
});

templateContainer.append(...elements);

const openProfilePopup = () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscape);
}

profileClose.addEventListener("click", () => {
  closePopup(profilePopup);
});

newPlacesClose.addEventListener("click", () => {

  closePopup(newPlaces);
});

imagePopupClose.addEventListener("click", () => {
  closePopup(imagePopup);
});

const openPopupNewPlace = () => {
  openPopup(newPlaces);
};

const submitProfileForm = (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
  closePopup(profilePopup);
};

// Закрытие попап вне элемента

const popupList = Array.from(document.querySelectorAll(".popup"));
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("popup__container")) {
      closePopup(popup);
    }
  });
});

// Закртыие попап на ESC

const handleEscape = (e) => {
  if (e.key === "Escape") {
    const currentPopup = document.querySelector(".popup_opened");
    closePopup(currentPopup);
  }
};

const handleCardFormSubmit = (e) => {
  e.preventDefault();
  const itemCard = {};
  itemCard.link = linkNameForm.value;
  itemCard.name = titleNameForm.value;
  renderCard(itemCard);
  newPlacesForm.reset();
  disableButton(newPlaces, validationConfig);
  closePopup(newPlaces);
};

profileForm.addEventListener("submit", submitProfileForm);
newPlacesForm.addEventListener("submit", handleCardFormSubmit);
btnEdit.addEventListener("click", openProfilePopup);
btnAdd.addEventListener("click", openPopupNewPlace);

