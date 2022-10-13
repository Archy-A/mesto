export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save-inactive',
  errorClass: 'popup__error_visible',
  errorRedLineClass: 'popup__edit-error'
}

export const profilePopup = document.querySelector('.popup-edit');
export const addCardPopup = document.querySelector('.popup-add');

export const profileInfoName = document.querySelector('.profile__name');
export const profileInfoActivity = document.querySelector('.profile__activity');
export const inputFieldActivity = profilePopup.querySelector('.popup__edit_activity_title');
export const inputFieldName = profilePopup.querySelector('.popup__edit_name_copy');
export const buttonProfile = document.querySelector('.profile__edit-button');
export const buttonCard = document.querySelector('.profile__add-button');
export const elementList = document.querySelector('.elements');
export const cardName = addCardPopup.querySelector('.popup__edit_card-name');
export const cardLink = addCardPopup.querySelector('.popup__edit_cardlink');
export const formCardInserting = document.querySelector('.popup__add-form');
export const formProfileEditing = document.querySelector('.popup__edit-form');
