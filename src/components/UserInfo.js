export default class UserInfo {
    constructor( { aboutUserSelector, userNameSelector, userAvatarSelector }) {
        this._aboutUser = document.querySelector(aboutUserSelector);
        this._userName = document.querySelector(userNameSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
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
        this.setUserAvatar(userData);
    };
    setUserAvatar (data) {
        this._userAvatar = data.avatar;
    };
};