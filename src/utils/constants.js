export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save-inactive',
  errorClass: 'popup__error_visible',
  errorRedLineClass: 'popup__edit-error'
}

export const profilePopup = document.querySelector('.popup-edit');
export const cardPopup = document.querySelector('.popup-add');
export const avaPopup = document.querySelector('.popup-ava');

export const profileInfoName = document.querySelector('.profile__name');
export const profileInfoActivity = document.querySelector('.profile__activity');
export const inputFieldActivity = profilePopup.querySelector('.popup__edit_activity_title');
export const inputFieldName = profilePopup.querySelector('.popup__edit_name_copy');
export const buttonProfile = document.querySelector('.profile__edit-button');
export const buttonCard = document.querySelector('.profile__add-button');
export const buttonSaveAva = document.getElementById('popup__ava-save-button');
export const buttonDelete = document.getElementById('popup__delete-button');
export const buttonSaveCard =  document.getElementById('popup__card-save-button');
export const buttonSaveProfile = document.getElementById('popup__profile-save-button');
export const elementContainer = document.querySelector('.elements');
export const cardName = cardPopup.querySelector('.popup__edit_card-name');
export const cardLink = cardPopup.querySelector('.popup__edit_cardlink');
export const formCardInserting = document.querySelector('.popup__add-form');
export const formProfileEditing = document.querySelector('.popup__edit-form');
export const ava = document.querySelector('.profile__avatar');
export const avaOnhover = document.querySelector('.profile__avatar-hover');

export const imagePopupSelector = '.popup-photo';
export const cardPopupSelector = '.popup-add';
export const avaPopupSelector = '.popup-ava';
export const containerSelector = '.elements'
export const profileInfoNameSelector = '.profile__name';
export const profileInfoActivitySelector = '.profile__activity';
export const profileInfoAvatar = '.profile__avatar';

export const alertMessage = '????????????... ??????-???? ?????????????????? ???? ??????????????, ???????????????? ???????? ??????????. ?????? ????????????:';
export const token = '395bc3aa-f34f-406b-9552-e0d3786795c0';
export const link = 'https://nomoreparties.co/v1/cohort-52/';

export const ServerInfoData =
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52/users/me',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
  }
