import './index.css';
import { initialCards, validationConfig } from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const inputTypeAbout = document.querySelector('.popup__input_type_about');
const inputTypeUsername = document.querySelector('.popup__input_type_username');
const popupAddFormSelector = '.popup_add_form';
const popupEditFormSelector = '.popup_edit_form';
const popupWithImageFormSelector = '.popup_picture';
const inputTypeCardName = document.querySelector('.popup__input_type_cardname');
const inputTypeCardLink = document.querySelector('.popup__input_type_cardlink');
const buttonOpenPopupWithAvatar = document.querySelector('.profile__avatar-button');
const cardsContainerSelector = '.cards';
const popupWithConfirmButtonSelector = '.popup_confirm';
const popupWithAvatarSelector = '.popup_update_avatar';
const profileAvatarLink = document.querySelector('.profile__avatar');
const inputTypeAvatarLink = document.querySelector('.popup__input_type_avatarlink');
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
const popupWithAvatar = new PopupWithForm ({
  popupSelector: popupWithAvatarSelector,
  handleFormSubmit: () => {
    profileAvatarLink.src = inputTypeAvatarLink.value;
    popupWithAvatar.close();
  }
});
const popupWithImage = new PopupWithImage (popupWithImageFormSelector);
const popupWithConfirmButton = new Popup (popupWithConfirmButtonSelector);
const formAddValidator = new FormValidator(validationConfig, '.popup__form-add');
const formEditValidator = new FormValidator(validationConfig, '.popup__form-edit');
const formAvatarValidator = new FormValidator(validationConfig, '.popup__form-avatar');
const createCard = (inputValues) => {
  const card = new Card({
    data: inputValues,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleOpenPopupWithConfirmButton: () => {
      popupWithConfirmButton.open();
    },
    handleClosePopupWithConfirmButton: () => {
      popupWithConfirmButton.close();
    }
  }, '.card_type_default');
  return card.generateCard();
};
const openEditProfilePopup = () => {
  const userInfoData =  userInfo.getUserInfo();
  inputTypeUsername.value = userInfoData.userName;
  inputTypeAbout.value = userInfoData.aboutUser;
  formEditValidator.clearInputErrors();
  popupEditProfile.open();
};
const openAddCardForm = () => {
  formAddValidator.clearInputErrors();
  popupAddCard.open();
};
const openEditAvatarPopup = () => {
  inputTypeAvatarLink.value = profileAvatarLink.src;
  formAvatarValidator.clearInputErrors();
  popupWithAvatar.open();
};
buttonOpenEditProfileForm.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardForm.addEventListener('click', openAddCardForm);
buttonOpenPopupWithAvatar.addEventListener('click', openEditAvatarPopup);
formAddValidator.enableValidation();
formEditValidator.enableValidation();
formAvatarValidator.enableValidation();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupWithImage.setEventListeners();
popupWithConfirmButton.setEventListeners();
popupWithAvatar.setEventListeners();
cardList.renderItems(initialCards);