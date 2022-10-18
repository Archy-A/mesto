import { Popup } from "../components/Popup.js";
// вероятно здесь была ошибка в замечании:
// "Импортов в класс не должно быть, только родительский класс для наследования"
// мы здесь как раз и используем родительский класс Popup для наследования
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
