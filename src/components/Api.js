class Api {
  constructor(options){
    this.baseUrl = options.baseUrl;
    this.auth = options.headers;
  }

  getInitialCards() {
    return fetch(this.baseUrl, {
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
    return fetch(this.baseUrl, {
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

}

export { Api as Api };
