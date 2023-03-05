const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const validationConfig = {
  selectorForm: '.popup__form',
  selectorInput: '.popup__input',
  buttonSelectorSubmit: '.popup__save-button',
  errorFormElement: '.popup__form-error',
  buttonClassInactive: 'popup__save-button_disabled',
  inputClassError: 'popup__input_type_error',
  formClassError: 'popup__form-error_active',
};
const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputTypeAbout = document.querySelector('.popup__input_type_about');
const inputTypeUsername = document.querySelector('.popup__input_type_username');
//const popupAddForm = document.querySelector('.popup_add_form');
//const popupEditForm = document.querySelector('.popup_edit_form');
const popupAddFormSelector = '.popup_add_form';
const popupEditFormSelector = '.popup_edit_form';
const popupForm = document.querySelector('.popup__form');
const buttonTypeClose = document.querySelectorAll('.popup__close-button');
const inputTypeCardName = document.querySelector('.popup__input_type_cardname');
const inputTypeCardLink = document.querySelector('.popup__input_type_cardlink');
const cardsContainer = document.querySelector('.cards');
const cardsContainerSelector = '.cards';
const popupPicture = document.querySelector('.popup_picture');
const popupImage = document.querySelector('.popup__image');
const popupTitlePicture = document.querySelector('.popup__title-picture');
const popupList = document.querySelectorAll('.popup');
export { 
  initialCards,
  validationConfig,
  buttonOpenEditProfileForm,
  buttonOpenAddCardForm,
  profileTitle,
  profileSubtitle,
  inputTypeAbout,
  inputTypeUsername,
  //popupAddForm,
  //popupEditForm,
  popupAddFormSelector,
  popupEditFormSelector,
  popupForm,
  buttonTypeClose,
  inputTypeCardName,
  inputTypeCardLink,
  cardsContainer,
  cardsContainerSelector,
  popupPicture,
  popupImage,
  popupTitlePicture,
  popupList
};