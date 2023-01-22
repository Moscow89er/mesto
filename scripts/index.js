const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupAddForm = document.querySelector('.popup_add_form');
const popupEditForm = document.querySelector('.popup_edit_form');
const inputTypeWorkstyle = popup.querySelector('.popup__input_type_workstyle');
const inputTypeUsername = popup.querySelector('.popup__input_type_username');
const popupForm = popup.querySelector('.popup__form');
const closeButtons = document.querySelectorAll('.popup__close-button');
const elements = document.querySelector('.elements');
const popupZoomImage = document.querySelector('.popup_zoom_image');
const popupImage = document.querySelector('.popup__image');
const popupTitleZoomImage = document.querySelector('.popup__title-zoom_image');
const inputTypeNamecard = document.querySelector('.popup__input_type_namecard');
const inputTypeLinkcard = document.querySelector('.popup__input_type_linkcard');
const elementTemplate = document.querySelector('#element-template').content;


function openPopup (element) {
  element.classList.add('popup_opened');
};

editButton.addEventListener('click', function () {
  inputTypeUsername.value = profileTitle.textContent;
  inputTypeWorkstyle.value = profileSubtitle.textContent;
  openPopup(popupEditForm);
});

addButton.addEventListener('click', () => {openPopup(popupAddForm)});

function closePopup (element) {
    element.classList.remove('popup_opened');
};

closeButtons.forEach ((button) => {
    const element = button.closest('.popup');
    button.addEventListener('click', () => closePopup(element));
});

function saveEditForm (evt) {
    closePopup(popupEditForm);
    evt.preventDefault();
    profileTitle.textContent = inputTypeUsername.value;
    profileSubtitle.textContent = inputTypeWorkstyle.value;
};

popupForm.addEventListener('submit', saveEditForm);

function saveAddForm (evt) {
  evt.preventDefault();
  elements.prepend(createCard(inputTypeNamecard.value, inputTypeLinkcard.value));
  closePopup(popupAddForm);
  inputTypeNamecard.value = '';
  inputTypeLinkcard.value = '';
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

  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__image').alt = name;
  cardElement.querySelector('.element__image').src = link;

  const deleteCardButton = cardElement.querySelector('.element__delete-button');
  deleteCardButton.addEventListener('click', deleteCard);

  const likeButton = cardElement.querySelector('.element__like-button');
  likeButton.addEventListener('click', likeCard);

  const elementImage = cardElement.querySelector('.element__image');
  elementImage.addEventListener('click', function (evt) {
    openPopup(popupZoomImage);
    popupImage.src = evt.target.src;
    popupTitleZoomImage.textContent = evt.target.closest('.element__container').textContent;
  });

  return cardElement;
};

initialCards.forEach ((element) => {
  elements.append(createCard(element.name, element.link));
});