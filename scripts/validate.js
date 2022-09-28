// validation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const showInputError = (popup, element, errorMessage, config) => {
//   const errorElement = popup.querySelector(`.${element.id}-error`);
//   element.classList.add(config.errorRedLineClass);
//   errorElement.textContent = errorMessage;
//   if (element.validity.valueMissing) {
//     errorElement.textContent = "Вы пропустили это поле.";
//   }
//   if (element.validity.tooShort) {
//     errorElement.textContent = "Введите не менее 2-х символов.";
//   }
//   if (element.validity.patternMismatch) {
//     errorElement.textContent = "Введите адрес сайта.";
//   }
// };

// const hideInputError = (popup, element, config) => {
//   const errorElement = popup.querySelector(`.${element.id}-error`);
//   element.classList.remove(config.errorRedLineClass);
//   errorElement.textContent = '';
// };

// const checkForValidity = (popup, editField, config) => {
//   if (!editField.validity.valid) {
//     showInputError(popup, editField, editField.validationMessage, config);
//   } else {
//     hideInputError(popup, editField, config);
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// };

// const toggleButtonState = (inputList, buttonElement, config) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(config.inactiveButtonClass);
//     buttonElement.setAttribute("disabled", "");
//   } else {
//     buttonElement.classList.remove(config.inactiveButtonClass);
//     buttonElement.removeAttribute("disabled");
//   }
// };

// const validateInput = (form, input, inputList, config) => {
//   const buttonElement = form.querySelector(config.submitButtonSelector);
//   checkForValidity(form, input, config);
//   toggleButtonState(inputList, buttonElement, config);
// }

// const setEventListeners = (formElement, config) => {
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       validateInput(formElement, inputElement, inputList, config);
//     });
//   });
// };

// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, config);
//   });
// };

// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__edit',
//   submitButtonSelector: '.popup__save',
//   inactiveButtonClass: 'popup__save-inactive',
//   errorClass: 'popup__error_visible',
//   errorRedLineClass: 'popup__edit-error'
// }

// enableValidation(validationConfig);
