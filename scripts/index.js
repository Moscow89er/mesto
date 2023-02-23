const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputTypeAbout = document.querySelector('.popup__input_type_about');
const inputTypeUsername = document.querySelector('.popup__input_type_username');
const popupAddForm = document.querySelector('.popup_add_form');
const popupEditForm = document.querySelector('.popup_edit_form');
const popupPicture = document.querySelector('.popup_picture');
const popupEditProfileForm = document.querySelector('.popup__form');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupImage = document.querySelector('.popup__image');
const popupTitlePicture = document.querySelector('.popup__title-picture');


class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._likeButton = this._element.querySelector('.element__like-button');

    this._setEventListeners();

    this._elementTitle.textContent = this._name;
    this._elementImage.alt = this._name;
    this._elementImage.src = this._link;
    
    return this._element;
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
    this._elementImage.addEventListener('click', () => {
      openPopup(popupPicture);
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupTitlePicture.textContent = this._name;
    });
  };
  
  _likeCard() {
    this._likeButton.classList.toggle('element__like-button_active');
  };

  _deleteCard() {
    this._deleteButton.closest('.element__container').remove();
    evt.stopPropagation;
  };
};

initialCards.forEach (item => {
  const card = new Card(item, '.element_type_default');
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});

const openPopup = (element) => {
  document.addEventListener('mousedown', clickOutsideClosePopup);
  document.addEventListener('keydown', clickEscapeClosePopup);
  element.classList.add('popup_opened');
};
const saveEditForm = (evt) => {
    closePopup(popupEditForm);
    evt.preventDefault();
    profileTitle.textContent = inputTypeUsername.value;
    profileSubtitle.textContent = inputTypeAbout.value;
};
const saveAddForm = (evt) => {
  evt.preventDefault();
  elements.prepend(createCard(inputTypeCardName.value, inputTypeCardLink.value));
  closePopup(popupAddForm);
  addForm.reset();
};
buttonOpenEditProfileForm.addEventListener('click', function () {
  inputTypeUsername.value = profileTitle.textContent;
  inputTypeAbout.value = profileSubtitle.textContent;
  clearInputErrors(validationConfig);
  openPopup(popupEditForm);
});
buttonOpenAddCardForm.addEventListener('click', () => {
  clearInputErrors(validationConfig);
  openPopup(popupAddForm);
});
const closePopup = (element) => {
  document.removeEventListener('mousedown', clickOutsideClosePopup);
  document.removeEventListener('keydown', clickEscapeClosePopup);
  element.classList.remove('popup_opened');
};
closeButtons.forEach ((button) => {
  const element = button.closest('.popup');
  button.addEventListener('click', () => closePopup(element));
});
const clickOutsideClosePopup = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target === popupOpened) {
    closePopup(popupOpened);
  }
};
const clickEscapeClosePopup = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};
popupEditProfileForm.addEventListener('submit', saveEditForm);
popupAddForm.addEventListener('submit', saveAddForm);

/*const createCard = (name, link) => {
  const cardElement = elementTemplate.cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  const elementTitle = cardElement.querySelector('.element__title');
  const deleteCardButton = cardElement.querySelector('.element__delete-button');
  const likeButton = cardElement.querySelector('.element__like-button');
  elementTitle.textContent = name;
  elementImage.alt = name;
  elementImage.src = link;
  deleteCardButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  elementImage.addEventListener('click', () => {
    openPopup(popupPicture);
    popupImage.src = link;
    popupImage.alt = name;
    popupTitlePicture.textContent = name;
  });
  return cardElement;
};*/



