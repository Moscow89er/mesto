const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupAddForm = document.querySelector('.popup_add_form');
const popupEditForm = document.querySelector('.popup_edit_form');
const workstyle = popup.querySelector('.popup__input_type_workstyle');
const user = popup.querySelector('.popup__input_type_user');
const form = popup.querySelector('.popup__form');
const closeButtons = document.querySelectorAll('.popup__close-button');
const elements = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup_photo');
const popupImage = document.querySelector('.popup__image');
const popupTitlePhoto = document.querySelector('.popup__title-photo');
const nameCard = document.querySelector('.popup__input_type_namecard');
const linkCard = document.querySelector('.popup__input_type_linkcard');


function showPopup (element) {
  element.classList.add('popup_opened');
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
  elements.prepend(addCard(nameCard.value, linkCard.value));
  closePopup(popupAddForm);
  nameCard.value = '';
  linkCard.value = '';
};

const cardTemplate = document.querySelector('#element-template').content;

function addCard (name, link) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__title').textContent = name;
  /*cardElement.querySelector('.element__image').setAttribute('alt', name);*/
  cardElement.querySelector('.element__image').src = link;

  const deleteCardButton = cardElement.querySelector('.element__delete-button');
  deleteCardButton.addEventListener('click', deleteCard);

  const likeCardButton = cardElement.querySelector('.element__like-button');
  likeCardButton.addEventListener('click', likeCard);

  const elementImageClick = cardElement.querySelector('.element__image');
  elementImageClick.addEventListener('click', function (evt) {
    showPopup(popupPhoto);
    popupImage.src = evt.target.src;
    popupTitlePhoto.textContent = evt.target.closest('.element__container').textContent;
  });

  return cardElement;
};

initialCards.forEach ((element) => {
  elements.append(addCard(element.name, element.link));
});

editButton.addEventListener('click', function () {
  user.value = profileTitle.textContent;
  workstyle.value = profileSubtitle.textContent;
  showPopup(popupEditForm);
});
addButton.addEventListener('click', () => {showPopup(popupAddForm)});
form.addEventListener('submit', saveForm);
popupAddForm.addEventListener('submit', saveAddForm);
