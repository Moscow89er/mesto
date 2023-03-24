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
    setUserInfo (data) {
        this._aboutUser.textContent = data.about;
        this._userName.textContent = data.name;
        this.setUserAvatar(data);
    };
    setUserAvatar (data) {
        this._userAvatar.src = data.avatar;
    };
};