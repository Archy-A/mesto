import { Popup } from "../components/Popup.js";

class PopupWithForm extends Popup {

  constructor(popup, handleFormSubmit) {
    super(popup);
    this.handleFormSubmit = handleFormSubmit;
    this.form = popup.querySelector('.popup__form');
    this.inputList = this.form.querySelectorAll('.popup__edit');
  }

  _getInputValues() {
    let inputValues = {};
    this.inputList.forEach( (input) => {
      inputValues[input.name] = input.value;
    })
    return inputValues;
  }

  setEventListeners() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues())
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this.form.reset();
  }

}

export { PopupWithForm as PopupWithForm };

