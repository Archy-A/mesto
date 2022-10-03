class Card {
  static imagePopup = document.querySelector('.popup-photo');

  #name;
  #link;
  #openPopup;
  #likeButton;
  #elementCardTemplate;
  #elementCard;
  #deleteButton;
  #popupPhotoName;
  #popupPhotoImg;
  #cardImage;
  #cardSelector;

  constructor(name, link, cardSelector, openPopup) {
    this.#name = name;
    this.#link = link;
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
    this.#popupPhotoName.textContent = this.#name;
    this.#popupPhotoImg.src = this.#link;
    this.#popupPhotoImg.alt = this.#name;
    this.#openPopup(Card.imagePopup);
  }

  cardCreate () {
    this.#elementCard.querySelector('.element__name').textContent = this.#name;
    this.#cardImage.src = this.#link;
    this.#cardImage.alt = this.#name;
    this.#cardImage.addEventListener('click', () => this.#openImagePopup());
    this.#likeHandler();
    this.#deleteHandler();
    return this.#elementCard;
  }
}

export { Card as Card };
