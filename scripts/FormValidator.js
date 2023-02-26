export class FormValidator {
  constructor (config, form) {
    /*this._selectorForm = config.selectorForm;*/
    this._selectorInput = config.selectorInput;
    this._buttonSelectorSubmit = config.buttonSelectorSubmit;
    this._errorFormElement = config.errorFormElement;
    this._buttonClassInactive = config.buttonClassInactive;
    this._inputClassError = config.inputClassError;
    this._formClassError = config.formClassError;
    this._form = form;
  };
  _showInputError = (selectorForm, selectorInput, errorMessage) => {
    const errorElement = selectorForm.querySelector(`.${selectorInput.id}-error`);
    selectorInput.classList.add(this._inputClassError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formClassError);
  };
  _hideInputError = (selectorForm, selectorInput) => {
    const errorElement = selectorForm.querySelector(`.${selectorInput.id}-error`);
    selectorInput.classList.remove(this._inputClassError);
    errorElement.classList.remove(this._formClassError);
    errorElement.textContent = '';
  };
  _isValid = (selectorForm, selectorInput) => {
    if (!selectorInput.validity.valid) {
      this._showInputError(selectorForm, selectorInput, selectorInput.validationMessage);
    } else {
      this._hideInputError(selectorForm, selectorInput);
    }
  };
  _setEventListeners = (selectorForm) => {
    const inputsList = Array.from(selectorForm.querySelectorAll(this._selectorInput));
    const buttonSelectorSubmit = selectorForm.querySelector(this._buttonSelectorSubmit);
    this._toggleButtonState(inputsList, buttonSelectorSubmit);
    selectorForm.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(inputsList, buttonSelectorSubmit);
      }, 0);
    });
    this._toggleButtonState(inputsList, buttonSelectorSubmit);
    inputsList.forEach((selectorInput) => {
      selectorInput.addEventListener('input', () => {
        this._isValid(selectorForm, selectorInput);
        this._toggleButtonState(inputsList, buttonSelectorSubmit);
      });
    });
  };
  _hasInvalidInput = (inputsList) => {
    return inputsList.some((selectorInput) => {
      return !selectorInput.validity.valid;
    });
  };
  _toggleButtonState = (inputsList, buttonSelectorSubmit) => {
    if (this._hasInvalidInput (inputsList)) {
      buttonSelectorSubmit.classList.add(this._buttonClassInactive);
      buttonSelectorSubmit.setAttribute('disabled', 'disabled');
    } else {
      buttonSelectorSubmit.classList.remove(this._buttonClassInactive);
      buttonSelectorSubmit.removeAttribute('disabled', 'disabled');
    }
  };
  clearInputErrors = () => {
    const errorFormElements = document.querySelectorAll(this._errorFormElement);
    const inputsList = document.querySelectorAll(this._selectorInput);
    errorFormElements.forEach((errorElement) => {
      errorElement.textContent = '';
    });
    inputsList.forEach((selectorInput) => {
      selectorInput.classList.remove(this._inputClassError);
    });
    addForm.reset();
  };
  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._form));
    formList.forEach((selectorForm) => {
      selectorForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(selectorForm);
    });
  };
};