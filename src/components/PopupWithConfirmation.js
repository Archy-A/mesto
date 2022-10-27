import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this.form = this._popup.querySelector('.popup__form');
    this._callbackHandler = null;
  }

  setEventListeners() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackHandler();
      // this.close();
    });
    super.setEventListeners();
  }

  open(callbackHandler) {
    this._callbackHandler = callbackHandler;
    super.open();
  }

}

export { PopupWithConfirmation as PopupWithConfirmation };
