export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners = () => {
      this._popup.addEventListener('mousedown', (e) => {
          if (e.target.classList.contains('popup__container')) {
              this.close(this._popup)
          }
          if (e.target.classList.contains('popup__close')) {
            this.close(this._popup)
          }
      });
      document.addEventListener('keydown', this._handleEscClose);
  }
}

