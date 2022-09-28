class Card {
  static imagePopup = document.querySelector('.popup-photo');

  #name;
  #link;
  #elementTemplate;
  #openPopup;

  constructor(name, link, elementTemplate, openPopup) {
    this.#name = name;
    this.#link = link;
    this.#elementTemplate = elementTemplate;
    this.#openPopup = openPopup;
  }

  #likeHandler (elementCard) {
    const likeButton = elementCard.querySelector('.element__like');
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle('element__like_pressed')
      });
  }

  #deleteHandler (elementCard) {
    const deleteButton = elementCard.querySelector('.element__bin');
      deleteButton.addEventListener("click", () => {
        elementCard.remove();
      });
  }

  #openImagePopup() {
    const popupPhotoName = Card.imagePopup.querySelector('.popup-photo__name');
    const popupPhotoImg = Card.imagePopup.querySelector('.popup-photo__fullview');
    popupPhotoName.textContent = this.#name;
    popupPhotoImg.src = this.#link;
    popupPhotoImg.alt = this.#name;
    this.#openPopup(Card.imagePopup);
  }

  cardCreate () {
    const elementCardTemplate = this.#elementTemplate.cloneNode(true);
    const elementCard = elementCardTemplate.querySelector('.element');
    elementCard.querySelector('.element__name').textContent = this.#name;
    const cardImage = elementCard.querySelector('.element__picture');
    cardImage.src = this.#link;
    cardImage.alt = this.#name;
    cardImage.addEventListener('click', () => this.#openImagePopup());
    this.#likeHandler(elementCard);
    this.#deleteHandler(elementCard);
    return elementCardTemplate;
  }
}

export { Card as Card };
