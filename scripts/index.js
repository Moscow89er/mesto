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

const closeButton = document.querySelector('.popup__close-button');
const addForm = document.querySelector('.popup__add-form');


const nameCard = document.querySelector('.popup__input_type_namecard');
const linkCard = document.querySelector('.popup__input_type_linkcard');

//функция открытия попапов
function showPopupEditForm() {
    user.value = profileTitle.textContent;
    workstyle.value = profileSubtitle.textContent;
    popupEditForm.classList.add('popup_opened');
};
function showPopupAddForm() {
    popupAddForm.classList.add('popup_opened');
};
editButton.addEventListener('click', showPopupEditForm);
addButton.addEventListener('click', showPopupAddForm);
    
//функция закрытия попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});



//функция сохранения формы
function saveForm(evt) {
    closePopup(popup);
    evt.preventDefault();
    profileTitle.textContent = user.value;
    profileSubtitle.textContent = workstyle.value;
};
form.addEventListener('submit', saveForm);

//стартовое положение карточек на странице
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

initialCards.forEach(function (element) {
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.element__image').src = element.link;
    cardElement.querySelector('.element__title').alt = element.name;
    cardElement.querySelector('.element__title').textContent = element.name;

    elements.append(cardElement);
});

//функция добавления карточек

function saveAddForm(evt) {
  evt.preventDefault();
  addCard();
  closePopup(addForm);
}
addForm.addEventListener('submit', saveAddForm);

console.log(saveAddForm);

function addCard () {
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const elementTitle = cardElement.querySelector('.element__title');
  const elementImage = cardElement.querySelector('.element__image');

  initialCards.forEach(function (element) {
    elementTitle.textContent = element.name;
    elementImage.src = element.link;

    elements.prepend(cardElement);
  });
};