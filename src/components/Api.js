import {
  token,
  link
} from '../utils/constants.js'

class Api {
  constructor(options){
    this.endPoint = options.baseUrl;
    this.auth = options.headers;
    this.body = options.body;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${link}${this.endPoint[0]}`, {
      headers: {
        authorization: token,
      }
    })
    .then(res => {
      return this._checkResponse(res);
    })
    .then( (res) => {
      return res
    })
  }


  getUserInfo() {
    return fetch(`${link}${this.endPoint[1]}`,
    {
      headers: {
        authorization: token,
      }
    })
      .then(res => {
        return this._checkResponse(res);
      })
      .then( (res) => {
        return res
      })
  }

  setUserInfo(baseUrl, name, about) {
    return fetch(baseUrl, {
      method: 'PATCH',
      headers: {
         authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        return this._checkResponse(res);
      })
      .then( (res) => {
        return res
      })
  }

  setAva(avatar) {
    return fetch(`${link}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      avatar: avatar["name"]
      })
    })
      .then(res => {
        return this._checkResponse(res);
      })
      .then( (res) => {
        return res
      })
  }

  setCard(name, link) {
    return fetch(`https://nomoreparties.co/v1/cohort-52/cards`, {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        return this._checkResponse(res);
      })
      .then( (res) => {
        return res
      })
  }

  deleteCard(id) {
    return fetch(`${link}cards/${id}`, {
      method: 'DELETE',
      headers: {
      authorization: token,
      'Content-Type': 'application/json'
      },
    })
    .then(res => {
      return this._checkResponse(res);
    })
    .then( (res) => {
      return res;
    })
  }

  likeCard (element, userId) {
    let method = '';
    if (element.likes.find(o => o._id === userId )) {
      method = 'DELETE';
    }
    else {
      method = 'PUT';
    }
     return fetch(`${link}cards/${element._id}/likes`, {
        method: method,
        headers: {
        authorization: token,
        'Content-Type': 'application/json'
        },
      })
      .then(res => {
        return this._checkResponse(res);
      })
      .then( (res) => {
        return res;
      })
  }
}

export { Api as Api };
