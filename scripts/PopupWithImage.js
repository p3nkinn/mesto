import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({name, link}, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }
  open() {
    this._imageElement = this._popup.querySelector(".popup__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._imageSubtitle = this._popup.querySelector(".popup__subtitle").textContent = this._name;
    super.open();
  }
}
