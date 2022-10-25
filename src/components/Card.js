import {
  token,
} from '../utils/constants.js'

import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js'

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
  #handleCardDeleteApi;
  #popupDeleteForm;
  #handleCardLikeApi;

  constructor(element, cardSelector, handleCardClick, popupDeleteForm, handleCardDeleteApi, handleCardLikeApi) {
    this.#handleCardClick = handleCardClick;
    this.#handleCardDeleteApi = handleCardDeleteApi;
    this.#handleCardLikeApi = handleCardLikeApi;
    this.#popupDeleteForm = popupDeleteForm;
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
    this.#handleCardLikeApi(this.#element).then((data) => {
       this.#element.likes = data.likes;
       this._updateLikes();
    });

    }

  confirmDelete = () => {
    this.#popupDeleteForm.open(this.delete);
  }

  delete = () => {
    this.#handleCardDeleteApi(this.#element._id).then(() => {
      this.#elementCard.remove();
      this.#elementCard = null;
    });
  }

  _setEventListeners() {
    this.#likeButton.addEventListener("click", this._like);
    this.#deleteButton.addEventListener("click", () => this.confirmDelete());
    this.#cardImage.addEventListener('click', this.#handleCardClick);
  }

  _showBinForMyCards () {
    if (this.#element["owner"]._id !== this.myId) {
      this.#deleteButton.style.display = 'none';
    }
  }

  cardCreate () {
    this.#elementCard.querySelector('.element__name').textContent = this.#element.name;
    this.#cardImage.src = this.#element.link;
    this.#cardImage.alt = this.#element.name;

    this._updateLikes();

    if (this.#element["_id"] !== undefined) {
      this._showBinForMyCards();
    }

    this._setEventListeners();
    return this.#elementCard;
  }
}

export { Card as Card };
