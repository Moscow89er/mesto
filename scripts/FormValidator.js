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
  _showInputError = (/*formSelector, inputSelector,*/ errorMessage/*, validationConfig*/) => {
    const errorElement = this._form.querySelector(`.${this._inputSelector.id}-error`);
    this._inputSelector.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  _hideInputError = (/*formSelector, inputSelector, validationConfig*/) => {
    const errorElement = this._form.querySelector(`.${this._inputSelector.id}-error`);
    this._inputSelector.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
  _isValid = (/*formSelector, inputSelector*/) => {
    if (!this._inputSelector.validity.valid) {
      showInputError(/*formSelector, inputSelector, inputSelector.validationMessage, validationConfig*/);
    } else {
      hideInputError(/*formSelector, inputSelector, validationConfig*/);
    }
  };
  _setEventListeners = (/*formSelector, validationConfig*/) => {
    const inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
    //const submitButtonSelector = this._formSelector.querySelector(this._submitButtonSelector);
    _toggleButtonState(/*inputsList, submitButtonSelector, validationConfig*/);
    this._form.addEventListener('reset', () => {
      _setTimeout(() => {
        _toggleButtonState(/*inputsList, submitButtonSelector, validationConfig*/);
      }, 0);
    });
    _toggleButtonState(/*inputsList, submitButtonSelector, validationConfig*/);
    inputsList.forEach((/*inputSelector*/) => {
      this._inputSelector.addEventListener('input', () => {
        _isValid(/*formSelector, inputSelector*/);
        _toggleButtonState(/*inputsList, submitButtonSelector, validationConfig*/);
      });
    });
  };
  _hasInvalidInput = (inputsList) => {
    return inputsList.some((/*inputSelector*/) => {
      return !this.inputSelector.validity.valid;
    });
  };
  _toggleButtonState = (/*inputsList, submitButtonSelector, validationConfig*/) => {
    if (_hasInvalidInput (/*inputsList*/)) {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.setAttribute('disabled', 'disabled');
    } else {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
      this._submitButtonSelector.removeAttribute('disabled', 'disabled');
    }
  };
  _clearInputErrors = (/*validationConfig*/) => {
    const errorFormElements = this._form.querySelectorAll(this._errorFormElement); //был document вместо this._form
    const inputsList = this._form.querySelectorAll(this._inputSelector); //был document вместо this._form
    errorFormElements.forEach((errorElement) => {
      errorElement.textContent = '';
    });
    inputsList.forEach((/*inputSelector*/) => {
      this._inputSelector.classList.remove(this._inputErrorClass);
    });
    //addForm.reset(); //сделать импорт
  };
  enableValidation = (/*validationConfig*/) => {
    const formList = Array.from(this._form.querySelectorAll(this._formSelector));
    formList.forEach((/*formSelector*/) => {
      console.log(formList);
      this._formSelector.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      _setEventListeners(/*formSelector, validationConfig*/);
    });
  };
  enableValidation(/*validationConfig*/);
};
