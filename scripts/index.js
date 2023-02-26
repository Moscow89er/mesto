import { 
  validationConfig,
  buttonOpenEditProfileForm,
  buttonOpenAddCardForm,
  profileTitle,
  profileSubtitle,
  inputTypeAbout,
  inputTypeUsername,
  popupAddForm,
  popupEditForm,
  popupEditProfileForm,
  closeButtons,
  inputTypeCardName,
  inputTypeCardLink,
  cardsContainer
} from './constants.js';
import { Card } from './Card.js';
import { FormValidator} from './FormValidator.js';
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
  const card = new Card(newCard, '.card_type_default');
  cardsContainer.prepend(card.generateCard());
  closePopup(popupAddForm);
  addForm.reset();
};
buttonOpenEditProfileForm.addEventListener('click', function () {
  inputTypeUsername.value = profileTitle.textContent;
  inputTypeAbout.value = profileSubtitle.textContent;
  const formValidator = new FormValidator(validationConfig, '.popup__form-edit');
  formValidator.enableValidation();
  formValidator.clearInputErrors();
  openPopup(popupEditForm);
});
buttonOpenAddCardForm.addEventListener('click', () => {
  const formValidator = new FormValidator(validationConfig, '.popup__form-add');
  formValidator.enableValidation();
  formValidator.clearInputErrors();
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