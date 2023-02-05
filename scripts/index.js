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
  element.classList.add('popup_opened');
  enableValidation();
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
  elementImage.addEventListener('click', function (evt) {
    openPopup(popupPicture);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.closest('.element__container').textContent;
    popupTitlePicture.textContent = evt.target.closest('.element__container').textContent;
  });
  return cardElement;
};
initialCards.forEach (element => {
  elements.append(createCard(element.name, element.link));
});
buttonOpenEditProfileForm.addEventListener('click', function () {
  inputTypeUsername.value = profileTitle.textContent;
  inputTypeAbout.value = profileSubtitle.textContent;
  openPopup(popupEditForm);
});
buttonOpenAddCardForm.addEventListener('click', () => {openPopup(popupAddForm)});
function closePopup (element) {
    element.classList.remove('popup_opened');
    clearInputErrors();
};
closeButtons.forEach ((button) => {
    const element = button.closest('.popup');
    button.addEventListener('click', () => closePopup(element));
});
popups.forEach ((popup) => {
  const element = popup.closest('.popup');
  document.addEventListener('click', (evt) => {
    if (evt.target === element) {
      closePopup(element);
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(element);
    }
  });
});
popupEditProfileForm.addEventListener('submit', saveEditForm);
popupAddForm.addEventListener('submit', saveAddForm);