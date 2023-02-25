import { Card } from './Card.js';
import { FormValidator, validationConfig } from './FormValidator.js';

const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputTypeAbout = document.querySelector('.popup__input_type_about');
const inputTypeUsername = document.querySelector('.popup__input_type_username');
const popupAddForm = document.querySelector('.popup_add_form');
const popupEditForm = document.querySelector('.popup_edit_form');
const popupEditProfileForm = document.querySelector('.popup__form');
const closeButtons = document.querySelectorAll('.popup__close-button');
const inputTypeCardName = document.querySelector('.popup__input_type_cardname');
const inputTypeCardLink = document.querySelector('.popup__input_type_cardlink');
const elements = document.querySelector('.elements');
export const openPopup = (element) => {
  document.addEventListener('mousedown', clickOutsideClosePopup);
  document.addEventListener('keydown', clickEscapeClosePopup);
  element.classList.add('popup_opened');
};
const saveEditForm = (evt) => {
    closePopup(popupEditForm);
    evt.preventDefault();
    profileTitle.textContent = inputTypeUsername.value;
    profileSubtitle.textContent = inputTypeAbout.value;
};

const saveAddForm = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: inputTypeCardName.value,
    link: inputTypeCardLink.value
  };
  const card = new Card(newCard, '.element_type_default');
  elements.prepend(card.generateCard());
  closePopup(popupAddForm);
  addForm.reset();
};



buttonOpenEditProfileForm.addEventListener('click', function () {
  inputTypeUsername.value = profileTitle.textContent;
  inputTypeAbout.value = profileSubtitle.textContent;
  const formValidator = new FormValidator(validationConfig, '.popup__form-edit');
  formValidator.enableValidation(validationConfig);
  //formValidator._clearInputErrors(validationConfig);
  openPopup(popupEditForm);
});
buttonOpenAddCardForm.addEventListener('click', () => {
  //const formValidator = new FormValidator;
  //formValidator._clearInputErrors(validationConfig);
  openPopup(popupAddForm);
});
const closePopup = (element) => {
  document.removeEventListener('mousedown', clickOutsideClosePopup);
  document.removeEventListener('keydown', clickEscapeClosePopup);
  element.classList.remove('popup_opened');
};
closeButtons.forEach ((button) => {
  const element = button.closest('.popup');
  button.addEventListener('click', () => closePopup(element));
});
const clickOutsideClosePopup = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target === popupOpened) {
    closePopup(popupOpened);
  }
};
const clickEscapeClosePopup = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};
popupEditProfileForm.addEventListener('submit', saveEditForm);
popupAddForm.addEventListener('submit', saveAddForm);