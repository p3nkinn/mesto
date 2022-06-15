export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    _handleResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
      .then(this._handleResponse)
      }

    addNewCard(userData) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          link: userData.link
        })
      })
      .then(this._handleResponse)
    }

    getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
     })
      .then(this._handleResponse)
    }

    setProfileInfo(userData) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.username,
          about: userData.userjob
        })
      })
      .then(this._handleResponse)
    }

    addLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._handleResponse)
    }

    removeLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._handleResponse)
    }

    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers
      })
      .then(this._handleResponse)
    }

    addNewAvatar(userData) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: userData.link
        })
      })
      .then(this._handleResponse)
    }
    }

