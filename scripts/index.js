import { 
  initialCards,
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
  buttonTypeClose,
  inputTypeCardName,
  inputTypeCardLink,
  cardsContainer,
  popupList,
  popupFormList
} from './constants.js';
import { Card } from './Card.js';
import { FormValidator} from './FormValidator.js';
export const openPopup = (popup) => {
  popupList.forEach (() => {
    popup.addEventListener('mousedown', handleClosePopupByOverlay);
  });
  document.addEventListener('keydown', clickEscapeClosePopup);
  popup.classList.add('popup_opened');
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
const closePopup = (popup) => {
  document.removeEventListener('keydown', clickEscapeClosePopup);
  popup.classList.remove('popup_opened');
};
buttonTypeClose.forEach ((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
const handleClosePopupByOverlay = (evt) => {
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
initialCards.forEach (newCard => {
  const card = new Card(newCard, '.card_type_default');
  const cardElement = card.generateCard();
  document.querySelector('.cards').append(cardElement);
});