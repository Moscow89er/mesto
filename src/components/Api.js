export default class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    };

    getUserInfo () {
        return fetch(this._url + '/users/me', {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    };

    getInitialCards () {
        return fetch(this._url + '/cards', {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    };
    
    editUserInfo (userData) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.username,
                about: userData.about
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    };

    editUserAvatar (userData) {
        return fetch(this._url + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: userData.avatarlink
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    };

    /*addNewCard (data) {
        return fetch(this._url + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    };*/


    getData() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()]);
    };
  };