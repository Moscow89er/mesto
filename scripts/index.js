import { 
  initialCards,
  cardsContainerSelector,
  buttonOpenEditProfileForm,
  buttonOpenAddCardForm,
  inputTypeAbout,
  inputTypeUsername,
  popupAddFormSelector,
  popupEditFormSelector,
  popupWithImageFormSelector,
  inputTypeCardName,
  inputTypeCardLink,
  validationConfig
} from './constants.js';
import PopupWithImage from './PopupWithImage.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import FormValidator from './FormValidator.js';
import UserInfo from './UserInfo.js'; 
const userInfo = new UserInfo ({
  aboutUserSelector: '.profile__subtitle',
  userNameSelector: '.profile__title'
});
const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, cardsContainerSelector);
const popupAddCard = new PopupWithForm ({
  popupSelector: popupAddFormSelector,
  handleFormSubmit: () => {
    const newCard = {
      name: inputTypeCardName.value,
      link: inputTypeCardLink.value
    };
    cardList.addItem(createCard(newCard));
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
const createCard = (inputValues) => {
  const card = new Card({
    data: inputValues,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    }
  }, '.card_type_default');
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