const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupAddForm = document.querySelector('.popup__add-form');
const popupEditForm = document.querySelector('.popup__edit-form');
const workstyle = popup.querySelector('.popup__input_type_workstyle');
const user = popup.querySelector('.popup__input_type_user');
const form = popup.querySelector('.popup__form');
const closeButtons = document.querySelectorAll('.popup__close-button');
const elements = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup__photo');
const popupImage = document.querySelector('.popup__image');
const popupTitlePhoto = document.querySelector('.popup__title_photo');
const elementContainer = document.querySelector('.element__container');
const nameCard = document.querySelector('.popup__input_type_namecard');
const linkCard = document.querySelector('.popup__input_type_linkcard');
const cardTemplate = document.querySelector('#element-template').content;

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

function showPopupEditForm() {
    user.value = profileTitle.textContent;
    workstyle.value = profileSubtitle.textContent;
    popupEditForm.classList.add('popup_opened');
};

function showPopupAddForm () {
    popupAddForm.classList.add('popup_opened');
};

function closePopup (element) {
    element.classList.remove('popup_opened');
};

closeButtons.forEach ((button) => {
    const element = button.closest('.popup');
    button.addEventListener('click', () => closePopup(element));
});

function saveForm (evt) {
    closePopup(popup);
    evt.preventDefault();
    profileTitle.textContent = user.value;
    profileSubtitle.textContent = workstyle.value;
};

function deleteCard (evt) {
  evt.currentTarget.closest('.element__container').remove();
  evt.stopPropagation;
};

function likeCard (evt) {
  evt.target.classList.toggle('element__like-button_active');
};

function saveAddForm (evt) {
  evt.preventDefault();
  addCard();
  closePopup(popupAddForm);
  nameCard.value = '';
  linkCard.value = '';
};

function showPopupImage (evt) {
  popupPhoto.classList.add('popup_opened');
  popupImage.src = evt.target.src;
  popupTitlePhoto.textContent = evt.target.closest('.element__container').textContent;
};

initialCards.forEach(function (element) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.element__image').src = element.link;
    cardElement.querySelector('.element__title').alt = element.name;
    cardElement.querySelector('.element__title').textContent = element.name;

    const deleteCardButton = cardElement.querySelector('.element__delete-button');
    deleteCardButton.addEventListener('click', deleteCard);

    const likeCardButton = cardElement.querySelector('.element__like-button');
    likeCardButton.addEventListener('click', likeCard);

    const elementImageClick = cardElement.querySelector('.element__image');
    elementImageClick.addEventListener('click', showPopupImage);

    elements.append(cardElement);
});

function addCard () {
  const cardElement = cardTemplate.cloneNode(true);

  elementTitle = cardElement.querySelector('.element__title').textContent = nameCard.value;
  elementImage = cardElement.querySelector('.element__image').setAttribute('src', linkCard.value);

  const deleteCardButton = cardElement.querySelector('.element__delete-button');
  deleteCardButton.addEventListener('click', deleteCard);

  const likeCardButton = cardElement.querySelector('.element__like-button');
  likeCardButton.addEventListener('click', likeCard);

  const elementImageClick = cardElement.querySelector('.element__image');
  elementImageClick.addEventListener('click', showPopupImage);

  elements.prepend(cardElement);
};

editButton.addEventListener('click', showPopupEditForm);
addButton.addEventListener('click', showPopupAddForm);
form.addEventListener('submit', saveForm);
popupAddForm.addEventListener('submit', saveAddForm);