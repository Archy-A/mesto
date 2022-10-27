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
  #handleDeleteClicked;
  #handleLikeClicked;

  constructor(element, cardSelector, handleCardClick, handleDeleteClicked, handleLikeClicked, myId) {
    this.#handleCardClick = handleCardClick;
    this.#handleDeleteClicked = handleDeleteClicked;
    this.#handleLikeClicked = handleLikeClicked;
    this.#element = element;
    this.#cardSelector = cardSelector;
    this.#elementCardTemplate = document.querySelector(this.#cardSelector).content.cloneNode(true)
    this.#elementCard = this.#elementCardTemplate.querySelector('.element');
    this.#likeButton = this.#elementCard.querySelector('.element__like');
    this.#deleteButton = this.#elementCard.querySelector('.element__bin');
    this.#cardImage = this.#elementCard.querySelector('.element__picture');
    this.#amountLikes = this.#elementCard.querySelector('.amount-likes');
    this.like = this.like.bind(this);
    this.myId = myId;
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

  like (likes) {
    this.#element.likes = likes;
    this._updateLikes();
  }

  delete = () => {
    this.#elementCard.remove();
    this.#elementCard = null;
  };

  _setEventListeners() {
    this.#likeButton.addEventListener("click", () => this.#handleLikeClicked(this.#element, this));
    this.#deleteButton.addEventListener("click", () => this.#handleDeleteClicked(this.#element._id, this));
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
