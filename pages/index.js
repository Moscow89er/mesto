let profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle')
let editButton = profile.querySelector('.profile__edit-button');
let addButton = profile.querySelector('.profile__add-button');
let popup = document.querySelector('.popup');
let workstyle = popup.querySelector('.popup__input_type_workstyle');
let user = popup.querySelector('.popup__input_type_user');
let saveButton = popup.querySelector('.popup__save-button');
let closeButton = popup.querySelector('.popup__close-button');
function showPopup() {
    user.value = profileTitle.textContent;
    workstyle.value = profileSubtitle.textContent;
    popup.classList.add('popup-active');
};
function closePopup() {
    popup.classList.remove('popup-active');
};
function addUser() {
    popup.classList.remove('popup-active');
    profileTitle.textContent = `${user.value}`;
    user.value = '';
};
function addWorkstyle() {
    popup.classList.remove('popup-active');
    profileSubtitle.textContent = `${workstyle.value}`;
    workstyle.value = '';
};
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', addUser);
saveButton.addEventListener('click', addWorkstyle);
popup.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        saveButton.click();
    } else {return;}  
});