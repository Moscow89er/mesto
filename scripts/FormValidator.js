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

  _showInputError = (formSelector, inputSelector, errorMessage) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  _hideInputError = (formSelector, inputSelector) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
  _isValid = (formSelector, inputSelector) => {
    if (!inputSelector.validity.valid) {
      this._showInputError(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
      this._hideInputError(formSelector, inputSelector);
    }
  };


  //закончил тут
  _setEventListeners = (formSelector) => {
    const inputsList = Array.from(formSelector.querySelectorAll(this._inputSelector));
    const submitButtonSelector = formSelector.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputsList, submitButtonSelector, validationConfig);
    formSelector.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(inputsList, submitButtonSelector, validationConfig);
      }, 0);
    });
    this._toggleButtonState(inputsList, submitButtonSelector, validationConfig);
    inputsList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        this._isValid(formSelector, inputSelector);
        this._toggleButtonState(inputsList, submitButtonSelector, validationConfig);
      });
    });
  };
  _hasInvalidInput = (inputsList) => {
    return inputsList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  };
  _toggleButtonState = (inputsList, submitButtonSelector) => {
    if (this._hasInvalidInput (inputsList)) {
      submitButtonSelector.classList.add(this._inactiveButtonClass);
      submitButtonSelector.setAttribute('disabled', 'disabled');
    } else {
      submitButtonSelector.classList.remove(this._inactiveButtonClass);
      submitButtonSelector.removeAttribute('disabled', 'disabled');
    }
  };
  /*clearInputErrors = (validationConfig) => {
    const errorFormElements = document.querySelectorAll(validationConfig.errorFormElement);
    const inputsList = document.querySelectorAll(validationConfig.inputSelector);
    errorFormElements.forEach((errorElement) => {
      errorElement.textContent = '';
    });
    inputsList.forEach((inputSelector) => {
      inputSelector.classList.remove(validationConfig.inputErrorClass);
    });
    addForm.reset();
  };*/
  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._form));
    formList.forEach((item) => {
      item.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(item, validationConfig);
    });
  };
};