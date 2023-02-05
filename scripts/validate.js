const objects = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__form-error_active'
  };
  const showInputError = (formSelector, inputSelector, errorMessage) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__form-error_active');
  };
  const hideInputError = (formSelector, inputSelector) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__form-error_active');
    errorElement.textContent = '';
  };
  const isValid = (formSelector, inputSelector) => {
    if (!inputSelector.validity.valid) {
      showInputError(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
      hideInputError(formSelector, inputSelector);
    }
  };
  const setEventListeners = (formSelector) => {
    const inputsList = Array.from(formSelector.querySelectorAll('.popup__input'));
    const submitButtonSelector = formSelector.querySelector('.popup__save-button');
    toggleButtonState(inputsList, submitButtonSelector);
    inputsList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        isValid(formSelector, inputSelector);
        toggleButtonState(inputsList, submitButtonSelector);
      });
    });
  };
  const hasInvalidInput = (inputsList) => {
    return inputsList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  };
  const toggleButtonState = (inputsList, submitButtonSelector) => {
    if (hasInvalidInput(inputsList)) {
      submitButtonSelector.classList.add('popup__save-button_disabled');
      submitButtonSelector.setAttribute('disabled', 'disabled');
    } else {
      submitButtonSelector.classList.remove('popup__save-button_disabled');
      submitButtonSelector.removeAttribute('disabled', 'disabled');
    }
  };
  const clearInputErrors = () => {
    const errorFormElements = document.querySelectorAll('.popup__form-error');
    const inputsList = document.querySelectorAll('.popup__input');
    errorFormElements.forEach((errorElement) => {
      errorElement.textContent = '';
    });
    inputsList.forEach((inputSelector) => {
      inputSelector.classList.remove('popup__input_type_error');
    });
    addForm.reset();
  };
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formSelector) => {
        formSelector.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formSelector);
    });
  };
  enableValidation(objects);