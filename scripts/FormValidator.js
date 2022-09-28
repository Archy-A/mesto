class FormValidator {
  #formElement;
  #config;
  constructor(formElement, config) {
    this.#formElement = formElement;
    this.#config = config;
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

  #hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  #toggleButtonState = (inputList, buttonElement) => {
    if (this.#hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.#config.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(this.#config.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  #validateInput = (input, inputList) => {
    const buttonElement = this.#formElement.querySelector(this.#config.submitButtonSelector);
    this.#checkForValidity(input);
    this.#toggleButtonState(inputList, buttonElement);
  }

  #setEventListeners = (isCreating) => {
    const inputList = Array.from(this.#formElement.querySelectorAll(this.#config.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#validateInput(inputElement, inputList);
      });
        this.#validateInput(inputElement, inputList);
      if (isCreating) {
        this.#hideInputError(inputElement);
      }
    });
  };

  enableValidation = (isCreating=true) => {
      this.#formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this.#setEventListeners(isCreating);
  };
}

export { FormValidator as FormValidator };
