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
    
    getData() {
        return Promise.all([this.getInitialCards()]);
    }
    // другие методы работы с API
  };