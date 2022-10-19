class Card {

  #element;
  #likeButton;
  #elementCardTemplate;
  #elementCard;
  #deleteButton;
  #cardImage;
  #cardSelector;
  #handleCardClick;

  constructor(element, cardSelector, handleCardClick) {
    this.#handleCardClick = handleCardClick;
    this.#element = element;
    this.#cardSelector = cardSelector;
    this.#elementCardTemplate = document.querySelector(this.#cardSelector).content.cloneNode(true)
    this.#elementCard = this.#elementCardTemplate.querySelector('.element');
    this.#likeButton = this.#elementCard.querySelector('.element__like');
    this.#deleteButton = this.#elementCard.querySelector('.element__bin');
    this.#cardImage = this.#elementCard.querySelector('.element__picture');
    this._delete = this._delete.bind(this);
    this._like = this._like.bind(this);
  }

  _like () {
    this.#likeButton.classList.toggle('element__like_pressed');
  }

  _delete () {
    this.#elementCard.remove();
    this.#elementCard = null;
  }

  _setEventListeners() {
    this.#likeButton.addEventListener("click", this._like);
    this.#deleteButton.addEventListener("click", this._delete);
    this.#cardImage.addEventListener('click', this.#handleCardClick);
  }

  cardCreate () {
    this.#elementCard.querySelector('.element__name').textContent = this.#element.name;
    this.#cardImage.src = this.#element.link;
    this.#cardImage.alt = this.#element.name;
    this._setEventListeners();
    return this.#elementCard;
  }
}

export { Card as Card };
