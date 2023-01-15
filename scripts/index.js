let profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');
let editButton = profile.querySelector('.profile__edit-button');
let addButton = profile.querySelector('.profile__add-button');
let popup = document.querySelector('.popup');
let popupAddForm = document.querySelector('.popup_add-form');
let popupEditForm = document.querySelector('.popup_edit-form');
let workstyle = popup.querySelector('.popup__input_type_workstyle');
let user = popup.querySelector('.popup__input_type_user');
let closeButton = popup.querySelector('.popup__close-button');
let form = popup.querySelector('.popup__form');
let closeButtons = document.querySelectorAll('.popup__close-button');

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