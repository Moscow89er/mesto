import './index.css';
import { validationConfig } from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmButton from '../components/PopupWithConfirmButton.js';
import Api from '../components/Api.js';
const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const inputTypeAbout = document.querySelector('.popup__input_type_about');
const inputTypeUsername = document.querySelector('.popup__input_type_username');
const popupAddFormSelector = '.popup_add_form';
const popupEditFormSelector = '.popup_edit_form';
const popupWithImageFormSelector = '.popup_picture';
const buttonOpenPopupWithAvatar = document.querySelector('.profile__avatar-button');
const cardsContainerSelector = '.cards';
const popupWithConfirmButtonSelector = '.popup_confirm';
const popupWithAvatarSelector = '.popup_update_avatar';
const profileAvatarLink = document.querySelector('.profile__avatar');
const inputTypeAvatarLink = document.querySelector('.popup__input_type_avatarlink');
let userId;
const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'f222d885-e074-4ace-9dec-53e306a04a75',
    'Content-Type': 'application/json'
  }
});
const userInfo = new UserInfo ({
  aboutUserSelector: '.profile__subtitle',
  userNameSelector: '.profile__title',
  userAvatarSelector: '.profile__avatar'
});
const cardList = new Section ({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, cardsContainerSelector);
const popupAddCard = new PopupWithForm ({
  popupSelector: popupAddFormSelector,
  handleFormSubmit: (newData) => {
    popupAddCard.renderLoading(true);
    api.addNewCard(newData)
    .then((data) =>{
      cardList.addItem(createCard(data));
      popupAddCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
  }
});
const popupEditProfile = new PopupWithForm ({
  popupSelector: popupEditFormSelector,
  handleFormSubmit: (newData) => {
    popupEditProfile.renderLoading(true);
    api.editUserInfo(newData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditProfile.renderLoading(false);
    });
  }
});
const popupWithAvatar = new PopupWithForm ({
  popupSelector: popupWithAvatarSelector,
  handleFormSubmit: (newData) => {
    popupWithAvatar.renderLoading(true);
    api.editUserAvatar(newData)
    .then((data) => {
      userInfo.setUserAvatar(data);
      popupWithAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithAvatar.renderLoading(false);
    });
  }
});
const popupWithConfirmButton = new PopupWithConfirmButton (popupWithConfirmButtonSelector);
const popupWithImage = new PopupWithImage (popupWithImageFormSelector);
const formAddValidator = new FormValidator(validationConfig, '.popup__form-add');
const formEditValidator = new FormValidator(validationConfig, '.popup__form-edit');
const formAvatarValidator = new FormValidator(validationConfig, '.popup__form-avatar');
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleLikeClick: () => {
      card.likeCard();
    },
    handleDeleteIconClick: () => {
      const buttonConfirmDeleteCard = document.querySelector('.popup__confirm-button');
      api.deleteCard(data._id)
        .then(() => {
          popupWithConfirmButton.open();
        })
        .then(() => {
          buttonConfirmDeleteCard.addEventListener('click', () => {
            card.deleteCard();
            popupWithConfirmButton.close();
        })
        .catch((err) => console.log(err));
      })
    },
    handleClosePopupWithConfirmButton: () => {
      popupWithConfirmButton.close();
    }
  }, api, userId, '.card_type_default');
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
api.getData()
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    const reversedCards = cards.reverse();
    cardList.renderItems(reversedCards);
  })
  .catch((err) => console.log(err));