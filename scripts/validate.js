const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  errorFormElement: '.popup__form-error',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-error_active',
};
const showInputError = (formSelector, inputSelector, errorMessage, validationConfig) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
const hideInputError = (formSelector, inputSelector, validationConfig) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};
const isValid = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, validationConfig);
  } else {
    hideInputError(formSelector, inputSelector, validationConfig);
  }
};
const setEventListeners = (formSelector, validationConfig) => {
  const inputsList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
  const submitButtonSelector = formSelector.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputsList, submitButtonSelector, validationConfig);
  formSelector.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputsList, submitButtonSelector, validationConfig);
    }, 0);
  });
  toggleButtonState(inputsList, submitButtonSelector, validationConfig);
  inputsList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector);
      toggleButtonState(inputsList, submitButtonSelector, validationConfig);
    });
  });
};
const hasInvalidInput = (inputsList) => {
  return inputsList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
};
const toggleButtonState = (inputsList, submitButtonSelector, validationConfig) => {
  if (hasInvalidInput (inputsList)) {
    submitButtonSelector.classList.add(validationConfig.inactiveButtonClass);
    submitButtonSelector.setAttribute('disabled', 'disabled');
  } else {
    submitButtonSelector.classList.remove(validationConfig.inactiveButtonClass);
    submitButtonSelector.removeAttribute('disabled', 'disabled');
  }
};
const clearInputErrors = (validationConfig) => {
  const errorFormElements = document.querySelectorAll(validationConfig.errorFormElement);
  const inputsList = document.querySelectorAll(validationConfig.inputSelector);
  errorFormElements.forEach((errorElement) => {
    errorElement.textContent = '';
  });
  inputsList.forEach((inputSelector) => {
    inputSelector.classList.remove(validationConfig.inputErrorClass);
  });
  addForm.reset();
};
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formSelector, validationConfig);
  });
};
enableValidation(validationConfig);