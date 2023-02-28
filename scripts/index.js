import { 
  initialCards,
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
  formValidator
} from './constants.js';
import { Card } from './Card.js';

const addNewCard = (data, templateSelector) => {
  
  const card = new Card(data, templateSelector);
  return card.generateCard();
}

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
  cardsContainer.prepend(addNewCard(newCard, '.card_type_default'));
  closePopup(popupAddForm);
  addForm.reset();
};
buttonOpenEditProfileForm.addEventListener('click', function () {
  inputTypeUsername.value = profileTitle.textContent;
  inputTypeAbout.value = profileSubtitle.textContent;
  formValidator.clearInputErrors();
  formValidator.enableValidation();
  openPopup(popupEditForm);
});
buttonOpenAddCardForm.addEventListener('click', () => {
  formValidator.clearInputErrors();
  formValidator.enableValidation();
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
initialCards.forEach ((initialCard) => {
  const cardElement = addNewCard(initialCard, '.card_type_default');
  cardsContainer.append(cardElement);
});
//formValidator.enableValidation();