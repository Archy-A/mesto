import {
  token,
} from '../utils/constants.js'

class Api {
  constructor(options){
    this.endPoint = options.baseUrl;
    this.auth = options.headers;
    this.body = options.body;
    this.myId = '48b3ab75093bc34c58d271be';
  }

  getInitialCards() {
    return fetch(`https://nomoreparties.co/v1/cohort-52/${this.endPoint}`, {
      headers: this.auth
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then( (res) => {
        return res
      })
  }

  getUserInfo() {
    return fetch(`https://nomoreparties.co/v1/cohort-52/${this.endPoint}`, {
      headers: this.auth
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then( (res) => {
        return res
      })
  }

  setUserInfo(baseUrl, auth, name, about) {
    return fetch(baseUrl, {
      method: 'PATCH',
      headers: auth,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then( (res) => {
        return res
      })
  }

  setCard(auth, name, link) {
    return fetch(`https://nomoreparties.co/v1/cohort-52/cards`, {
      method: 'POST',
      headers: auth,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then( (res) => {
        return res
      })
  }

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${id}`, {
      method: 'DELETE',
      headers: {
      authorization: token,
      'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then( (res) => {
      return res;
    })
  }

  likeCard (element) {
    let method = '';
    if (element.likes.find(o => o._id === this.myId )) {
      method = 'DELETE';
    }
    else {
      method = 'PUT';
    }
     return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${element._id}/likes`, {
        method: method,
        headers: {
        authorization: token,
        'Content-Type': 'application/json'
        },
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then( (res) => {
        return res;
      })
  }

}

export { Api as Api };
