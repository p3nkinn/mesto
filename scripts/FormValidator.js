"use strict";
export {buttonDisabled}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export default class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showErrorInput = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideErrorInput = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showErrorInput(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideErrorInput(formElement, inputElement);
    }
  }

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toogleButtonElement(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toogleButtonElement(inputList, buttonElement);
      });
    });
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toogleButtonElement = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  disableButton = (formElement) => {
    const button = formElement.querySelector(this._submitButtonSelector);
    if (button) {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    }
  }

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (e) => {
        e.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }
}
const buttonDisabled = new FormValidator(validationConfig, ".popup__new-form");
const profileFormValidator = new FormValidator(validationConfig, ".popup__form_profile");
const newPlacesFormValidator = new FormValidator(validationConfig, ".popup__new-form");
profileFormValidator.enableValidation();
newPlacesFormValidator.enableValidation();





