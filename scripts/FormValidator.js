export class FormValidator {
  constructor (config, form) {
    this.config = config;
    this._selectorInput = config.selectorInput;
    this._buttonSelectorSubmit = config.buttonSelectorSubmit;
    this._errorFormElement = config.errorFormElement;
    this._buttonClassInactive = config.buttonClassInactive;
    this._inputClassError = config.inputClassError;
    this._formClassError = config.formClassError;
    this._form = form;
    this._selectorForm = document.querySelector(this._form);
    this._buttonSubmit = this._selectorForm.querySelector(this._buttonSelectorSubmit);
    this._inputsList = Array.from(this._selectorForm.querySelectorAll(this._selectorInput));
  };
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._selectorForm.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formClassError);
    inputElement.classList.add(this._inputClassError);
  };
  _hideInputError = (inputElement) => {
    const errorElement = this._selectorForm.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._formClassError);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputClassError);
  };
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  _setEventListeners = () => {
    this._toggleButtonState();
    this._selectorForm.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };
  _hasInvalidInput = () => {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  _toggleButtonState = () => {
    if (this._hasInvalidInput ()) {
      this._buttonSubmit.classList.add(this._buttonClassInactive);
      this._buttonSubmit.setAttribute('disabled', 'disabled');
    } else {
      this._buttonSubmit.classList.remove(this._buttonClassInactive);
      this._buttonSubmit.removeAttribute('disabled');
    }
  };
  clearInputErrors = () => {
    const errorFormElements = this._selectorForm.querySelectorAll(this._errorFormElement);
    const inputsList = this._selectorForm.querySelectorAll(this._selectorInput);
    errorFormElements.forEach((errorElement) => {
      errorElement.textContent = '';
    });
    inputsList.forEach((inputElement) => {
      inputElement.classList.remove(this._inputClassError);
    });
      
  };
  enableValidation = () => {
    this._setEventListeners();
  };
};