class Api {
  constructor(options){
    this.endPoint = options.baseUrl;
    this.auth = options.headers;
    this.body = options.body;
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

}

export { Api as Api };
