import { 
  initialCards,
  cardsContainerSelector,
  buttonOpenEditProfileForm,
  buttonOpenAddCardForm,
  profileTitle,
  profileSubtitle,
  inputTypeAbout,
  inputTypeUsername,
  cardsContainer,
  //popupAddForm,
  //popupEditForm,
  popupForm,
  popupAddFormSelector,
  popupEditFormSelector,
  //buttonTypeClose,
  inputTypeCardName,
  inputTypeCardLink,
  validationConfig,
  //popupList
} from './constants.js';


import Card from './Card.js';
import Section from './Section.js';
import Popup from './Popup.js';

import { FormValidator } from './FormValidator.js';

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card (item, '.card_type_default');
    const sectionElement = card.generateCard();
    cardList.addItem(sectionElement);
  }
}, cardsContainerSelector);

const popupAddCard = new Popup (popupAddFormSelector);
const popupEditProfile = new Popup (popupEditFormSelector);

const formAddValidator = new FormValidator(validationConfig, '.popup__form-add');
const formEditValidator = new FormValidator(validationConfig, '.popup__form-edit');

const createCard = (data, templateSelector) => {
  const card = new Card(data, templateSelector);
  return card.generateCard();
};

const openEditProfilePopup = () => {
  inputTypeUsername.value = profileTitle.textContent;
  inputTypeAbout.value = profileSubtitle.textContent;
  formEditValidator.clearInputErrors();
  popupEditProfile.open();
};
const openAddCardForm = () => {
  addForm.reset();
  formAddValidator.clearInputErrors();
  popupAddCard.open();
};
const handleSaveEditForm = (evt) => {
  popupEditProfile.close();
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
  cardsContainer.prepend(createCard(newCard, '.card_type_default'));
  popupAddCard.close();
};
popupForm.addEventListener('submit', handleSaveEditForm);
popupForm.addEventListener('submit', handleSaveAddForm);
buttonOpenEditProfileForm.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardForm.addEventListener('click', openAddCardForm);
formAddValidator.enableValidation();
formEditValidator.enableValidation();

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

cardList.renderItems();