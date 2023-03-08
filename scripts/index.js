import { 
  initialCards,
  cardsContainerSelector,
  buttonOpenEditProfileForm,
  buttonOpenAddCardForm,
  inputTypeAbout,
  inputTypeUsername,
  cardsContainer,
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
import PopupWithForm from './PopupWithForm.js';
import { FormValidator } from './FormValidator.js';
import UserInfo from './UserInfo.js'; 
const userInfo = new UserInfo ({
  aboutUserSelector: '.profile__subtitle',
  userNameSelector: '.profile__title'
});
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
  handleFormSubmit: () => {
    const newCard = {
      name: inputTypeCardName.value,
      link: inputTypeCardLink.value
    };
    cardsContainer.prepend(createCard(newCard, '.card_type_default'));
    popupAddCard.close();
  }
});
const popupEditProfile = new PopupWithForm ({
  popupSelector: popupEditFormSelector,
  handleFormSubmit: (inputsValues) => {
    popupEditProfile.close();
    userInfo.setUserInfo(inputsValues);
  }
});
const popupWithImage = new PopupWithImage (popupWithImageFormSelector);
const formAddValidator = new FormValidator(validationConfig, '.popup__form-add');
const formEditValidator = new FormValidator(validationConfig, '.popup__form-edit');
const createCard = (data, templateSelector) => {
  const card = new Card(data, templateSelector);
  return card.generateCard();
};
const openEditProfilePopup = () => {
  inputTypeUsername.value = userInfo.getUserInfo().userName;
  inputTypeAbout.value = userInfo.getUserInfo().aboutUser;
  formEditValidator.clearInputErrors();
  popupEditProfile.open();
};
const openAddCardForm = () => {
  formAddValidator.clearInputErrors();
  popupAddCard.open();
};
buttonOpenEditProfileForm.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardForm.addEventListener('click', openAddCardForm);
formAddValidator.enableValidation();
formEditValidator.enableValidation();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupWithImage.setEventListeners();
cardList.renderItems();