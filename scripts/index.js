import { Card } from './card.js'
import { FormValidator } from './FormValidator.js'

const profilePopup = document.querySelector('.popup-edit');
const addCardPopup = document.querySelector('.popup-add');
const imagePopup = document.querySelector('.popup-photo');

const profileInfoName = document.querySelector('.profile__name');
const profileInfoActivity = document.querySelector('.profile__activity');
const inputFieldActivity = profilePopup.querySelector('.popup__edit_activity_title');
const inputFieldName = profilePopup.querySelector('.popup__edit_name_copy');
const buttonProfile = document.querySelector('.profile__edit-button');
const buttonCard = document.querySelector('.profile__add-button');
const elementTemplate = document.querySelector('.element-template').content;
const elementList = document.querySelector('.elements');
const cardName = addCardPopup.querySelector('.popup__edit_card-name');
const cardLink = addCardPopup.querySelector('.popup__edit_cardlink');
const popupPhotoName = imagePopup.querySelector('.popup-photo__name');
const popupPhotoImg = imagePopup.querySelector('.popup-photo__fullview');
const formCardInserting = document.querySelector('.popup__add-form');
const formProfileEditing = document.querySelector('.popup__edit-form');
const editField = profilePopup.querySelector('.popup__edit');
const popupForm = profilePopup.querySelector('.popup__form');


const initialCards = [
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

// save(add) profile information >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const saveProfileHandler = function (evt) {
  evt.preventDefault();
  profileInfoName.textContent = inputFieldName.value;
  profileInfoActivity.textContent = inputFieldActivity.value;
  onClosePopupRequest(evt);
}

// save(add) new card >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const saveCardHandler = function (evt) {
  evt.preventDefault();
  const element = {
    name: cardName.value,
    link: cardLink.value
    };
  const elementCard = new Card (element.name, element.link, elementTemplate, openPopup);
  elementList.prepend(elementCard.cardCreate());
  onClosePopupRequest(evt);
}

// OnClick processors for profilePopup, cardPopup, imagePopup: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function openProfilePopup() {
  inputFieldName.value = profileInfoName.textContent;
  inputFieldActivity.value = profileInfoActivity.textContent;
  initPopup(profilePopup, false);
  openPopup(profilePopup);
}

function openAddCardPopup() {
  cardName.value = '';
  cardLink.value = '';
  initPopup(addCardPopup, true);
  openPopup(addCardPopup);
}

function initPopup(popup, isCreating)
{
  const formValidator = new FormValidator (popup, validationConfig);
  formValidator.enableValidation(isCreating);
}

// popup open function for all elements: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function openPopup(popup) {
  popup.classList.add('popup-opened');
  document.addEventListener('keydown', closeByEscape);
}

// popup close function for all elements: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function onClosePopupRequest(evt) {
  const popup = evt.target.closest(".popup");
  closePopup(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup-opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup-opened');
    closePopup(openedPopup);
  }
}

// event listeners: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const popups = document.querySelectorAll('.popup')
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup-opened')
       || evt.target.classList.contains('popup-photo__container')
       || evt.target.classList.contains('popup__container'))
        {
            closePopup(popup);
        }
      if (evt.target.classList.contains('popup__btn-close')) {
            closePopup(popup);
        }
    })
  })

const popupFormList = document.querySelectorAll('.popup__form');
[...popupFormList].forEach((popupForm) =>
 popupForm.addEventListener('click', (e) => {
 e.stopPropagation();
 }));
 popupPhotoImg.addEventListener('click', (e) => {
  e.stopPropagation();
 });

const root = document.querySelector('.root');
root.addEventListener("keydown", closeByEscape);
buttonCard.addEventListener('click', openAddCardPopup);
buttonProfile.addEventListener('click', openProfilePopup);
formCardInserting.addEventListener('submit', saveCardHandler);
formProfileEditing.addEventListener('submit', saveProfileHandler);

// cards add from the array >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
initialCards.forEach(function (element) {
  const elementCard = new Card (element.name, element.link, elementTemplate, openPopup);
  elementList.append(elementCard.cardCreate());
});

// form validation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const runValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
      const formValidator = new FormValidator (formElement, config);
      formValidator.enableValidation();
    });
}


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save-inactive',
  errorClass: 'popup__error_visible',
  errorRedLineClass: 'popup__edit-error'
}

runValidation(validationConfig);
