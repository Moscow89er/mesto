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
  popupAddForm,
  popupEditForm,
  popupAddFormSelector,
  popupEditFormSelector,
  popupWithImageFormSelector,
  inputTypeCardName,
  inputTypeCardLink,
  validationConfig,
} from './constants.js';
import PopupWithImage from './PopupWithImage.js';
import Card from './Card.js';
import Section from './Section.js';
//import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import { FormValidator } from './FormValidator.js';
const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card (item, '.card_type_default');
    const sectionElement = card.generateCard();
    cardList.addItem(sectionElement);
  }
}, cardsContainerSelector);

const popupAddCard = new PopupWithForm ({
  popupSelector: popupAddFormSelector,
  handleFormSubmit: (formData) => {
    const card = new Card (formData, '.card_type_default');
    //const cardElement = card.generateCard();
    //cardList.setItem(cardElement);
  }
});
const popupEditProfile = new PopupWithForm ({
  popupSelector: popupEditFormSelector,
  handleFormSubmit: (formData) => {
    const card = new Card (formData, '.card_type_default');
    //const cardElement = card.generateCard();
   //cardList.setItem(cardElement);
  }
});



/*const popupAddCard = new Popup (popupAddFormSelector);
const popupEditProfile = new Popup (popupEditFormSelector);*/
const popupWithImage = new PopupWithImage (popupWithImageFormSelector);
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
  //evt.preventDefault();
  profileTitle.textContent = inputTypeUsername.value;
  profileSubtitle.textContent = inputTypeAbout.value;
};
const handleSaveAddForm = (evt) => {
  //evt.preventDefault();
  const newCard = {
    name: inputTypeCardName.value,
    link: inputTypeCardLink.value
  };
  cardsContainer.prepend(createCard(newCard, '.card_type_default'));
  popupAddCard.close();
};
popupEditForm.addEventListener('submit', handleSaveEditForm);
popupAddForm.addEventListener('submit', handleSaveAddForm);
buttonOpenEditProfileForm.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardForm.addEventListener('click', openAddCardForm);
formAddValidator.enableValidation();
formEditValidator.enableValidation();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupWithImage.setEventListeners();
cardList.renderItems();