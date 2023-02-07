const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const buttonOpenEditProfileForm = profile.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupAddForm = document.querySelector('.popup_add_form');
const popupEditForm = document.querySelector('.popup_edit_form');
const inputTypeAbout = popup.querySelector('.popup__input_type_about');
const inputTypeUsername = popup.querySelector('.popup__input_type_username');
const popupEditProfileForm = popup.querySelector('.popup__form');
const closeButtons = document.querySelectorAll('.popup__close-button');
const elements = document.querySelector('.elements');
const popupPicture = document.querySelector('.popup_picture');
const popupImage = document.querySelector('.popup__image');
const popupTitlePicture = document.querySelector('.popup__title-picture');
const inputTypeCardName = document.querySelector('.popup__input_type_cardname');
const inputTypeCardLink = document.querySelector('.popup__input_type_cardlink');
const elementTemplate = document.querySelector('#element-template').content;
const addForm = document.querySelector('.popup__form-add');
const popups = document.querySelectorAll('.popup');
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
const deleteCard = (evt) => {
  evt.currentTarget.closest('.element__container').remove();
  evt.stopPropagation;
};
const likeCard = (evt) => {
  evt.target.classList.toggle('element__like-button_active');
};
const createCard = (name, link) => {
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
};
initialCards.forEach (element => {
  elements.append(createCard(element.name, element.link));
});
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