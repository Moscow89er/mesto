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
        if (data.name) {
            this._userName.textContent = data.name;
        }
        if (data.about) {
            this._aboutUser.textContent = data.about;
        }
        if (data.avatar) {
            this.setUserAvatar(data);
        }
    };
    setUserAvatar (data) {
        this._userAvatar.src = data.avatar;
    };
};