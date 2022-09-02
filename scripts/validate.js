// validation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

formProfileEditing.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

const formError = formProfileEditing.querySelector(`.${inputFieldName.id}-error`);
const showInputError = (formProfileEditing, element, errorMessage, config) => {
  const errorElement = formProfileEditing.querySelector(`.${element.id}-error`);
  element.classList.add(config.errorRedLineClass);
  errorElement.textContent = errorMessage;
  if (element.validity.valueMissing) {
    errorElement.textContent = "Вы пропустили это поле.";
  }
  if (element.validity.tooShort) {
    errorElement.textContent = "Введите не менее 2-х символов.";
  }
  errorElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formProfileEditing, element, config) => {
  const errorElement = formProfileEditing.querySelector(`.${element.id}-error`);
  element.classList.remove(config.errorRedLineClass);
  errorElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};

const isValid = (formProfileEditing, inputFieldName, config) => {
  if (!inputFieldName.validity.valid) {
    showInputError(formProfileEditing, inputFieldName, inputFieldName.validationMessage, config);
    formError.classList.add(config.inputErrorClass);
  } else {
    hideInputError(formProfileEditing, inputFieldName, config);
    formError.classList.remove(config.inputErrorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const validateInput = (form, input, inputList, config) => {
  const buttonElement = form.querySelector(config.submitButtonSelector);
  isValid(form, input, config);
  toggleButtonState(inputList, buttonElement, config);
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      validateInput(formElement, inputElement, inputList, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save-inactive',
  inputErrorClass: 'form__input-error_active',
  errorClass: 'popup__error_visible',
  errorRedLineClass: 'popup__edit-error'
}


enableValidation(validationConfig);


