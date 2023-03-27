export default class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    };
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };
    getUserInfo() {
        return fetch(this._url + '/users/me', {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse);
    };
    getInitialCards() {
        return fetch(this._url + '/cards', {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse);
    };
    editUserInfo(userData) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.username,
                about: userData.about
            })
        })
        .then(this._checkResponse);
    };
    editUserAvatar(userData) {
        return fetch(this._url + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: userData.avatarlink
            })
        })
        .then(this._checkResponse);
    };
    addNewCard(data) {
        return fetch(this._url + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.cardname,
                link: data.cardlink,
                cardId: data._id
            })
        })
        .then(this._checkResponse);
    };
    deleteCard(cardId) {
        return fetch (this._url + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse);
    };
    likeCard(cardId) {
        return fetch (this._url + `/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponse);
    };
    dislikeCard(cardId) {
        return fetch (this._url + `/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse);
    };
    getData() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()]);
    };
  };