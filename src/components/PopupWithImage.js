import { Popup } from "../components/Popup.js";

class PopupWithImage extends Popup {

  constructor(imagePopupSelector) {
    super(imagePopupSelector)
    this.popupPhotoName = this._popup.querySelector('.popup-photo__name');
    this.popupPhotoImg = this._popup.querySelector('.popup-photo__fullview');
  }

open(element) {
    this.popupPhotoName.textContent = element.name;
    this.popupPhotoImg.src = element.link;
    this.popupPhotoImg.alt = element.name;
    super.open();
  }
}

export { PopupWithImage as PopupWithImage }
