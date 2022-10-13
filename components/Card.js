class Card {
  static imagePopup = document.querySelector('.popup-photo');

  #element;
  #openPopup;
  #likeButton;
  #elementCardTemplate;
  #elementCard;
  #deleteButton;
  #popupPhotoName;
  #popupPhotoImg;
  #cardImage;
  #cardSelector;

  constructor(element, cardSelector, openPopup) {
    this.#element = element;
    this.#openPopup = openPopup;
    this.#cardSelector = cardSelector;
    this.#elementCardTemplate = document.querySelector(this.#cardSelector).content.cloneNode(true)
    this.#elementCard = this.#elementCardTemplate.querySelector('.element');
    this.#likeButton = this.#elementCard.querySelector('.element__like');
    this.#deleteButton = this.#elementCard.querySelector('.element__bin');
    this.#cardImage = this.#elementCard.querySelector('.element__picture');
    this.#popupPhotoName = Card.imagePopup.querySelector('.popup-photo__name');
    this.#popupPhotoImg = Card.imagePopup.querySelector('.popup-photo__fullview');
  }

  #likeHandler () {
    this.#likeButton.addEventListener("click", () => {
      this.#likeButton.classList.toggle('element__like_pressed')
      });
  }

  #deleteHandler () {
    this.#deleteButton.addEventListener("click", () => {
        this.#elementCard.remove();
      });
  }

  #openImagePopup() {
    this.#popupPhotoName.textContent = this.#element.name;
    this.#popupPhotoImg.src = this.#element.link;
    this.#popupPhotoImg.alt = this.#element.name;
    this.#openPopup(Card.imagePopup);
  }

  cardCreate () {
    this.#elementCard.querySelector('.element__name').textContent = this.#element.name;
    this.#cardImage.src = this.#element.link;
    this.#cardImage.alt = this.#element.name;
    this.#cardImage.addEventListener('click', () => this.#openImagePopup());
    this.#likeHandler();
    this.#deleteHandler();
    return this.#elementCard;
  }
}

export { Card as Card };
