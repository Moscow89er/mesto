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
  formAddValidator,
  formEditValidator
} from './constants.js';
import { openPopup } from './utils.js';
import { Card } from './Card.js';
const addNewCard = (data, templateSelector) => {
  const card = new Card(data, templateSelector);
  return card.generateCard();
};
const customizationEditProfileForm = () => {
  inputTypeUsername.value = profileTitle.textContent;
  inputTypeAbout.value = profileSubtitle.textContent;
  openPopup(popupEditForm);
};
const closePopup = (popup) => {
  document.removeEventListener('keydown', clickEscapeClosePopup);
  popup.classList.remove('popup_opened');
  addForm.reset();
  formEditValidator.clearInputErrors();
  formAddValidator.clearInputErrors();
};
export const handleClosePopupByOverlay = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target === popupOpened) {
    closePopup(popupOpened);
  }
};
export const clickEscapeClosePopup = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};
const handleSaveEditForm = (evt) => {
  closePopup(popupEditForm);
  evt.preventDefault();
  profileTitle.textContent = inputTypeUsername.value;
  profileSubtitle.textContent = inputTypeAbout.value;
};
const handleSaveAddForm = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: inputTypeCardName.value,
    link: inputTypeCardLink.value
  };
  cardsContainer.prepend(addNewCard(newCard, '.card_type_default'));
  closePopup(popupAddForm);
  addForm.reset();
};
buttonTypeClose.forEach ((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
initialCards.forEach ((initialCard) => {
  const cardElement = addNewCard(initialCard, '.card_type_default');
  cardsContainer.append(cardElement);
});
popupEditProfileForm.addEventListener('submit', handleSaveEditForm);
popupAddForm.addEventListener('submit', handleSaveAddForm);
buttonOpenEditProfileForm.addEventListener('click', customizationEditProfileForm);
buttonOpenAddCardForm.addEventListener('click', () => {
  openPopup(popupAddForm);
});
formAddValidator.enableValidation();
formEditValidator.enableValidation();