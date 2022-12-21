let profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let workstyle = popup.querySelector('.popup__input_type_workstyle');
let user = popup.querySelector('.popup__input_type_user');
let closeButton = popup.querySelector('.popup__close-button');
let form = popup.querySelector('.popup__form');
function showPopup() {
    user.value = profileTitle.textContent;
    workstyle.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
};
function closePopup() {
    popup.classList.remove('popup_opened');
};
function saveForm(evt) {
    closePopup();
    evt.preventDefault();
    profileTitle.textContent = user.value;
    profileSubtitle.textContent = workstyle.value;
};
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', saveForm);