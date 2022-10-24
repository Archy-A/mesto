import {
  token,
} from '../utils/constants.js'

class Card {

  #element;
  #likeButton;
  #elementCardTemplate;
  #elementCard;
  #deleteButton;
  #cardImage;
  #cardSelector;
  #handleCardClick;
  #amountLikes;

  constructor(element, cardSelector, handleCardClick) {
    this.#handleCardClick = handleCardClick;
    this.#element = element;
    this.#cardSelector = cardSelector;
    this.#elementCardTemplate = document.querySelector(this.#cardSelector).content.cloneNode(true)
    this.#elementCard = this.#elementCardTemplate.querySelector('.element');
    this.#likeButton = this.#elementCard.querySelector('.element__like');
    this.#deleteButton = this.#elementCard.querySelector('.element__bin');
    this.#cardImage = this.#elementCard.querySelector('.element__picture');
    this.#amountLikes = this.#elementCard.querySelector('.amount-likes');
    this._like = this._like.bind(this);
    this.myId = '48b3ab75093bc34c58d271be';
  }


  _saveLikeToServer () {
    let method = '';
    if (this.#element.likes.find(o => o._id === this.myId )) {
      method = 'DELETE';
    }
    else {
      method = 'PUT';
    }
     return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${this.#element._id}/likes`, {
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

  _updateLikes () {
    if (this.#element.likes) {
      this.#amountLikes.textContent = this.#element.likes.length;

      if (this.#element.likes.find(o => o._id === this.myId )) {
        this.#likeButton.classList.add('element__like_pressed')
      } else {
        this.#likeButton.classList.remove('element__like_pressed')
      }
    }
  }

  _like () {
    this._saveLikeToServer().then( (data) => {
       this.#element.likes = data.likes;
       this._updateLikes();
    });

    }

  #delete = ()=> {
    this.#elementCard.remove();
    this.#elementCard = null;
  }

  _setEventListeners() {
    this.#likeButton.addEventListener("click", this._like);
    this.#deleteButton.addEventListener("click", this.#delete);
    this.#cardImage.addEventListener('click', this.#handleCardClick);
  }

  cardCreate () {
    this.#elementCard.querySelector('.element__name').textContent = this.#element.name;
    this.#cardImage.src = this.#element.link;
    this.#cardImage.alt = this.#element.name;

    this._updateLikes();

    this._setEventListeners();
    return this.#elementCard;
  }
}

export { Card as Card };
