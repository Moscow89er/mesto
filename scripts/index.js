import { 
  initialCards,
  cardsContainerSelector,
  buttonOpenEditProfileForm,
  buttonOpenAddCardForm,
  profileTitle,
  profileSubtitle,
  inputTypeAbout,
  inputTypeUsername,
  popupAddForm,
  cardsContainer,
  popupEditForm,
  popupEditProfileForm,
  buttonTypeClose,
  inputTypeCardName,
  inputTypeCardLink,
  validationConfig,
  popupList
} from './constants.js';


import Section from './Section.js';
import { openPopup } from './utils.js';
import { FormValidator } from './FormValidator.js';


const cardList = new Section ({data: initialCards}, cardsContainerSelector);


const formAddValidator = new FormValidator(validationConfig, '.popup__form-add');
const formEditValidator = new FormValidator(validationConfig, '.popup__form-edit');


const openEditProfilePopup = () => {
  inputTypeUsername.value = profileTitle.textContent;
  inputTypeAbout.value = profileSubtitle.textContent;
  formEditValidator.clearInputErrors();
  openPopup(popupEditForm);
};
const openAddCardForm = () => {
  addForm.reset();
  formAddValidator.clearInputErrors();
  openPopup(popupAddForm);
};
const closePopup = (popup) => {
  document.removeEventListener('keydown', handleClosePopupByEsc);
  popup.classList.remove('popup_opened');
};
export const handleClosePopupByOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};
export const handleClosePopupByEsc = (evt) => {
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
  cardList.renderItems(newCard, '.card_type_default');
  closePopup(popupAddForm);
};
buttonTypeClose.forEach ((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popupList.forEach ((popup) => {
  popup.addEventListener('mousedown', handleClosePopupByOverlay);
});
popupEditProfileForm.addEventListener('submit', handleSaveEditForm);
popupAddForm.addEventListener('submit', handleSaveAddForm);
buttonOpenEditProfileForm.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardForm.addEventListener('click', openAddCardForm);
formAddValidator.enableValidation();
formEditValidator.enableValidation(); 
cardList.renderItems();









/*const createCard = (data, templateSelector) => {
  const card = new Card(data, templateSelector);
  return card.generateCard();
};*/
/*initialCards.forEach ((initialCard) => {
  const cardElement = createCard(initialCard, '.card_type_default');
  cardsContainer.prepend(cardElement);
});*/