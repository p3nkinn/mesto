import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".popup__image");
    this._imageSubtitle = this._popup.querySelector(".popup__subtitle");
  }
  open({name, link}) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._imageSubtitle.textContent = name;
    super.open();
  }
}
