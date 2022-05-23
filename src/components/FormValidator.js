"use strict";

export default class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showErrorInput = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideErrorInput = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showErrorInput(inputElement, inputElement.validationMessage);
    } else {
      this._hideErrorInput(inputElement);
    }
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._toogleButtonElement(this._inputList, this._submitButton);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toogleButtonElement(this._inputList, this._submitButton);
      });
    });
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  resetValidation = () => {
    this._toogleButtonElement();
    this._inputList.forEach((inputElement) => {
      this._hideErrorInput(inputElement);
    });
  }

  _toogleButtonElement = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableButton();
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  disableButton = () => {
      if (this._submitButton) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  enableValidation = () => {
    this._formElement = document.querySelector(this._formSelector);
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
}

}
