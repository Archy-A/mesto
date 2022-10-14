import { Popup } from "../components/Popup.js";

class PopupWithImage extends Popup {

  static imagePopup = document.querySelector('.popup-photo');

  constructor(element) {
    super(PopupWithImage.imagePopup)
    this.element = element;
    this.popupPhotoName = PopupWithImage.imagePopup.querySelector('.popup-photo__name');
    this.popupPhotoImg = PopupWithImage.imagePopup.querySelector('.popup-photo__fullview');
  }

open() {
    this.popupPhotoName.textContent = this.element.name;
    this.popupPhotoImg.src = this.element.link;
    this.popupPhotoImg.alt = this.element.name;
    super.open();
  }
}

export { PopupWithImage as PopupWithImage }
