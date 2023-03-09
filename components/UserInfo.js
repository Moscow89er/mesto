export default class UserInfo {
    constructor( { aboutUserSelector, userNameSelector }) {
        this._aboutUser = document.querySelector(aboutUserSelector);
        this._userName = document.querySelector(userNameSelector);
    };
    getUserInfo () {
       const userData = {
        aboutUser: this._aboutUser.textContent,
        userName: this._userName.textContent
       }
       return userData;
    };
    setUserInfo (userData) {
        this._aboutUser.textContent = userData.about;
        this._userName.textContent = userData.username;
    };
};