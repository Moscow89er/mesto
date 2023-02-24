export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  errorFormElement: '.popup__form-error',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-error_active',
};

export class FormValidator {
  constructor (config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._errorFormElement = config.errorFormElement;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  };
  _showInputError () {
    const errorElement = document.querySelector(`.${this._inputSelector.id}-error`);
    this._form.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  /*const showInputError = (formSelector, inputSelector, errorMessage, validationConfig) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
  /*_hideInputError () {
    const errorElement = this._form.querySelector(`.${this._inputSelector.id}-error`);
    this._inputSelector.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
  _isValid () {
    if (!this._inputSelector.validity.valid) {
      showInputError();
    } else {
      hideInputError();
    }
  };
  _setEventListeners () {
    const inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
    //const submitButtonSelector = this._formSelector.querySelector(this._submitButtonSelector);
    _toggleButtonState();
    this._form.addEventListener('reset', () => {
      _setTimeout(() => {
        _toggleButtonState();
      }, 0);
    });
    _toggleButtonState();
    inputsList.forEach(() => {
      this._inputSelector.addEventListener('input', () => {
        _isValid();
        _toggleButtonState();
      });
    });
  };
  _hasInvalidInput (inputsList) { 
    return inputsList.some(() => {
      return !this._inputSelector.validity.valid;
    });
  }; //Возможно ошибка в получении inputList
  _toggleButtonState () {
    if (_hasInvalidInput (inputsList)) {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.setAttribute('disabled', 'disabled');
    } else {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
      this._submitButtonSelector.removeAttribute('disabled', 'disabled');
    }
  };*/
  _clearInputErrors () {
    const errorFormElements = document.querySelectorAll(this._errorFormElement); //был document вместо this._form
    const inputsList = document.querySelectorAll(this._inputSelector); //был document вместо this._form
    errorFormElements.forEach((errorElement) => {
      errorElement.textContent = '';
    });
    inputsList.forEach((inputSelector) => {
      inputSelector.classList.remove(this._inputErrorClass);
    });
    //addForm.reset(); //сделать импорт
  };
  
  /*enableValidation () {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      //setEventListeners(formSelector, validationConfig);
    });
  };
  enableValidation(validationConfig);*/
};