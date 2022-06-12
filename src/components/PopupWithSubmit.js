import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', e => {
      e.preventDefault();
      this.close()
   })
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
