"use strict";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

class FormValidator {
  constructor(config) {
    this.formSelector = config.formSelector;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorClass = config.inputErrorClass;
    this.errorClass = config.errorClass;
  }

  showErrorInput = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }

  hideErrorInput = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  }

  isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this.showErrorInput(formElement, inputElement, inputElement.validationMessage);
    } else {
      this.hideErrorInput(formElement, inputElement);
    }
  }

  setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
    const buttonElement = formElement.querySelector(this.submitButtonSelector);
    this.toogleButtonElement(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.isValid(formElement, inputElement);
        this.toogleButtonElement(inputList, buttonElement);
      });
    });
  }

  hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toogleButtonElement = (inputList, buttonElement) => {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  disableButton = (formElement) => {
    const button = formElement.querySelector(this.submitButtonSelector);
    if (button) {
      button.classList.add(this.inactiveButtonClass);
      button.disabled = true;
    }
  }

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (e) => {
        e.preventDefault();
      });
      this.setEventListeners(formElement);
    });
  }
}

const valid = new FormValidator(validationConfig)
valid.enableValidation(validationConfig);





