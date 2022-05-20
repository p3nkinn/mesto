import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault()
      this._handleFormSubmit(this._getInputValues());
      this._formElement.reset();
      console.log(dd)
      this.close();
    });
    super.setEventListeners()
  }

  close() {
    super.close()
  }
}
