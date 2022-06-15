import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._hanleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', e => {
      e.preventDefault();
      this._hanleFormSubmit(this._card)
    })

  }

  open(item) {
    super.open();
    this._card = item;
  }

  close() {
    super.close();
  }
}
