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
const inputTypeAbout = document.querySelector('.popup__input_type_about');
const inputTypeUsername = document.querySelector('.popup__input_type_username');
const popupAddFormSelector = '.popup_add_form';
const popupEditFormSelector = '.popup_edit_form';
const popupWithImageFormSelector = '.popup_picture';
const inputTypeCardName = document.querySelector('.popup__input_type_cardname');
const inputTypeCardLink = document.querySelector('.popup__input_type_cardlink');
const cardsContainerSelector = '.cards';
export { 
  initialCards,
  validationConfig,
  buttonOpenEditProfileForm,
  buttonOpenAddCardForm,
  inputTypeAbout,
  inputTypeUsername,
  popupAddFormSelector,
  popupEditFormSelector,
  popupWithImageFormSelector,
  inputTypeCardName,
  inputTypeCardLink,
  cardsContainerSelector,
};