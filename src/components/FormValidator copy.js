class FormValidator {

  #formElement;
  #config;
  #inputList;
  #buttonElement;

  constructor(formElement, config) {
    this.#formElement = formElement;
    this.#config = config;
    this.#buttonElement = formElement.querySelector(config.submitButtonSelector);
    this.#inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  }

  #showInputError = (element, errorMessage) => {
    const errorElement = this.#formElement.querySelector(`.${element.id}-error`);
    element.classList.add(this.#config.errorRedLineClass);
    errorElement.textContent = errorMessage;
    if (element.validity.valueMissing) {
      errorElement.textContent = "Вы пропустили это поле.";
    }
    if (element.validity.tooShort) {
      errorElement.textContent = "Введите не менее 2-х символов.";
    }
    if (element.validity.patternMismatch) {
      errorElement.textContent = "Введите адрес сайта.";
    }
  };

  #hideInputError = (element) => {
    const errorElement = this.#formElement.querySelector(`.${element.id}-error`);
    element.classList.remove(this.#config.errorRedLineClass);
    errorElement.textContent = '';
  };

  #checkForValidity = (editField) => {
    if (!editField.validity.valid) {
      this.#showInputError(editField, editField.validationMessage);
    } else {
      this.#hideInputError(editField);
    }
  };

  #hasInvalidInput = () => {
    return  this.#inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  #toggleButtonState = () => {
    if (this.#hasInvalidInput(this.#inputList)) {
      this.#buttonElement.classList.add(this.#config.inactiveButtonClass);
      this.#buttonElement.setAttribute("disabled", "");
    } else {
      this.#buttonElement.classList.remove(this.#config.inactiveButtonClass);
      this.#buttonElement.removeAttribute("disabled");
    }
  };

  #validateInput = (input) => {
    this.#checkForValidity(input);
    this.#toggleButtonState();
  }

  #setEventListeners = () => {
    this.#inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#validateInput(inputElement);
      });
      this.#validateInput(inputElement);
    });
  };

  resetError() {
    this.#inputList.forEach((editField) => {
      this.#hideInputError(editField);
      });
    this.#toggleButtonState();
    }

  enableValidation = () => {
      this.#formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this.#setEventListeners();
  };
}

export { FormValidator as FormValidator };
