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
  }

  #like () {
    this.#likeButton.classList.toggle('element__like_pressed')
  }

  #likeHandler () {
    this.#likeButton.addEventListener("click", this.#like);
  }

  #deleteHandler () {
    this.#deleteButton.addEventListener("click", () => {
        this.#elementCard.remove();
        this.#elementCard = null;
      });
  }

  cardCreate () {
    this.#elementCard.querySelector('.element__name').textContent = this.#element.name;
    this.#cardImage.src = this.#element.link;
    this.#cardImage.alt = this.#element.name;
    this.#cardImage.addEventListener('click', this.#handleCardClick);
    this.#likeHandler();
    this.#deleteHandler();
    return this.#elementCard;
  }
}

export { Card as Card };
