const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const buttonOpenEditProfileForm = profile.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupAddForm = document.querySelector('.popup_add_form');
const popupEditForm = document.querySelector('.popup_edit_form');
const inputTypeAbout = popup.querySelector('.popup__input_type_about');
const inputTypeUsername = popup.querySelector('.popup__input_type_username');
const popupEditProfileForm = popup.querySelector('.popup__form');
const closeButtons = document.querySelectorAll('.popup__close-button');
const elements = document.querySelector('.elements');
const popupPicture = document.querySelector('.popup_picture');
const popupImage = document.querySelector('.popup__image');
const popupTitlePicture = document.querySelector('.popup__title-picture');
const inputTypeCardName = document.querySelector('.popup__input_type_cardname');
const inputTypeCardLink = document.querySelector('.popup__input_type_cardlink');
const elementTemplate = document.querySelector('#element-template').content;
const addForm = document.forms.addForm;
function openPopup (element) {
  element.classList.add('popup_opened');
};
buttonOpenEditProfileForm.addEventListener('click', function () {
  inputTypeUsername.value = profileTitle.textContent;
  inputTypeAbout.value = profileSubtitle.textContent;
  openPopup(popupEditForm);
});
buttonOpenAddCardForm.addEventListener('click', () => {openPopup(popupAddForm)});
function closePopup (element) {
    element.classList.remove('popup_opened');
};
closeButtons.forEach (button => {
    const element = button.closest('.popup');
    button.addEventListener('click', () => closePopup(element));
});
function saveEditForm (evt) {
    closePopup(popupEditForm);
    evt.preventDefault();
    profileTitle.textContent = inputTypeUsername.value;
    profileSubtitle.textContent = inputTypeAbout.value;
};
popupEditProfileForm.addEventListener('submit', saveEditForm);
function saveAddForm (evt) {
  evt.preventDefault();
  elements.prepend(createCard(inputTypeCardName.value, inputTypeCardLink.value));
  closePopup(popupAddForm);
  addForm.reset();
};
popupAddForm.addEventListener('submit', saveAddForm);
function deleteCard (evt) {
  evt.currentTarget.closest('.element__container').remove();
  evt.stopPropagation;
};
function likeCard (evt) {
  evt.target.classList.toggle('element__like-button_active');
};
function createCard (name, link) {
  const cardElement = elementTemplate.cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  const elementTitle = cardElement.querySelector('.element__title');
  const deleteCardButton = cardElement.querySelector('.element__delete-button');
  const likeButton = cardElement.querySelector('.element__like-button');
  elementTitle.textContent = name;
  elementImage.alt = name;
  elementImage.src = link;
  deleteCardButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  elementImage.addEventListener('click', function (evt) {
    openPopup(popupPicture);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.closest('.element__container').textContent;
    popupTitlePicture.textContent = evt.target.closest('.element__container').textContent;
  });
  return cardElement;
};
initialCards.forEach (element => {
  elements.append(createCard(element.name, element.link));
});

/*const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);*/

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__form-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__form-error_active');
  errorElement.textContent = '';
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
    });
  });
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
enableValidation();




/*
const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  errorClass: '.popup__form-error_active'
};
enableValidation(obj);

function enableValidation ({ formSelector, inputSelector, submitButtonSelector, errorClass}) {
  //действие запуска процесса наложения валидации (должна быть отдельная функция)
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    //прописать обработчик для каждой формы, чтобы она на не сабмитилась
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    //действие наложения обработчиков на поля форм (должна быть отдельная функция)
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    inputs.forEach(input => {
      input.addEventListener('input', function () {
        //проверка валидности введенных данных (должна быть отдельная функция)
        if (input.validity.valid) {
          //написать функцию удаления errorPlace(скрыть ошибку)

        } else {
          //показать ошибку

          //поиск ErrorPlace - должна быть отдельная функция
          const inputName = input.getAttribute('name');
          const errorPlace = document.getElementById(`${inputName}-error`);
          errorPlace.textContent = input.validationMessage;
          errorPlace.classList.add(errorClass);
        }
      });
    });
  });
};
*/