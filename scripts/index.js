const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const buttonOpenEditProfileForm = profile.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupAddForm = document.querySelector('.popup_add_form');
const popupEditForm = document.querySelector('.popup_edit_form');
const inputTypeWorkstyle = popup.querySelector('.popup__input_type_workstyle');
const inputTypeUsername = popup.querySelector('.popup__input_type_username');
const popupEditProfileForm = popup.querySelector('.popup__form');
const closeButtons = document.querySelectorAll('.popup__close-button');
const elements = document.querySelector('.elements');
const popupPicture = document.querySelector('.popup_picture');
const popupImage = document.querySelector('.popup__image');
const popupTitlePicture = document.querySelector('.popup__title-picture');
const inputTypeNamecard = document.querySelector('.popup__input_type_namecard');
const inputTypeLinkcard = document.querySelector('.popup__input_type_linkcard');
const elementTemplate = document.querySelector('#element-template').content;
const addForm = document.forms.addform;
function openPopup (element) {
  element.classList.add('popup_opened');
};
buttonOpenEditProfileForm.addEventListener('click', function () {
  inputTypeUsername.value = profileTitle.textContent;
  inputTypeWorkstyle.value = profileSubtitle.textContent;
  openPopup(popupEditForm);
});
buttonOpenAddCardForm.addEventListener('click', () => {openPopup(popupAddForm)});
function closePopup (element) {
    element.classList.remove('popup_opened');
};
closeButtons.forEach (button => {
    const element = button.closest('.popup');
    button.addEventListener('click', () => closePopup(element));
});
function saveEditForm (evt) {
    closePopup(popupEditForm);
    evt.preventDefault();
    profileTitle.textContent = inputTypeUsername.value;
    profileSubtitle.textContent = inputTypeWorkstyle.value;
};
popupEditProfileForm.addEventListener('submit', saveEditForm);
function saveAddForm (evt) {
  evt.preventDefault();
  elements.prepend(createCard(inputTypeNamecard.value, inputTypeLinkcard.value));
  closePopup(popupAddForm);
  addForm.reset();
};
popupAddForm.addEventListener('submit', saveAddForm);
function deleteCard (evt) {
  evt.currentTarget.closest('.element__container').remove();
  evt.stopPropagation;
};
function likeCard (evt) {
  evt.target.classList.toggle('element__like-button_active');
};
function createCard (name, link) {
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