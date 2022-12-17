let profile = document.querySelector(".profile");
let profileTitle = profile.querySelector(".profile__title");
let profileSubtitle = profile.querySelector(".profile__subtitle")
let editButton = profile.querySelector(".profile__edit-button");
let addButton = profile.querySelector(".profile__add-button");
let popup = document.querySelector(".popup");
let saveButton = popup.querySelector(".popup__save-button");
let closeButton = popup.querySelector(".popup__close-button");
let element = document.querySelector(".element");
let likeButton = document.querySelector(".element__like-button");

function showPopup () {
    document.querySelector(".popup").classList.add("active");
};
editButton.addEventListener("click", showPopup);

function closePopup () {
    document.querySelector(".popup").classList.remove("active");
}
closeButton.addEventListener("click", closePopup);



function addUser () {
    document.querySelector(".popup").classList.remove("active");
    let user = popup.querySelector(".popup__input_type_user");
    profileTitle.textContent = `${user.value}`;
    user.value = '';
}

function addWorkstyle () {
    document.querySelector(".popup").classList.remove("active");
    let workstyle = popup.querySelector(".popup__input_type_workstyle");
    profileSubtitle.textContent = `${workstyle.value}`;
    workstyle.value = '';
}
saveButton.addEventListener('click', addUser);
saveButton.addEventListener('click', addWorkstyle);
