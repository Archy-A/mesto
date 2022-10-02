import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const profilePopup = document.querySelector('.popup-edit');
const addCardPopup = document.querySelector('.popup-add');

const profileInfoName = document.querySelector('.profile__name');
const profileInfoActivity = document.querySelector('.profile__activity');
const inputFieldActivity = profilePopup.querySelector('.popup__edit_activity_title');
const inputFieldName = profilePopup.querySelector('.popup__edit_name_copy');
const buttonProfile = document.querySelector('.profile__edit-button');
const buttonCard = document.querySelector('.profile__add-button');
const elementList = document.querySelector('.elements');
const cardName = addCardPopup.querySelector('.popup__edit_card-name');
const cardLink = addCardPopup.querySelector('.popup__edit_cardlink');
const formCardInserting = document.querySelector('.popup__add-form');
const formProfileEditing = document.querySelector('.popup__edit-form');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save-inactive',
  errorClass: 'popup__error_visible',
  errorRedLineClass: 'popup__edit-error'
}

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

// create card's class instance for EDIT-PORFILE and CARD-ADD popups
const profileformValidator = new FormValidator (profilePopup, validationConfig);
profileformValidator.enableValidation();

const addCardformValidator = new FormValidator (addCardPopup, validationConfig);
addCardformValidator.enableValidation();

// save(add) profile information >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const saveProfileHandler = function (evt) {
  evt.preventDefault();
  profileInfoName.textContent = inputFieldName.value;
  profileInfoActivity.textContent = inputFieldActivity.value;
  const popup = evt.target.closest(".popup");
  closePopup(popup);
}

// card create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const cardInstanceCreate = function (element) {
  const elementCard = new Card (element.name, element.link, openPopup);
  return elementCard.cardCreate();
}

// save(add) new card >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const saveCardHandler = function (evt) {
  evt.preventDefault();
  const element = {
    name: cardName.value,
    link: cardLink.value
    };
  const card = cardInstanceCreate(element);
  elementList.prepend(card);
  const popup = evt.target.closest(".popup");
  closePopup(popup);
}

function openProfilePopup() {
  inputFieldName.value = profileInfoName.textContent;
  inputFieldActivity.value = profileInfoActivity.textContent;
  profileformValidator.resetError();
  openPopup(profilePopup);
}

function openAddCardPopup() {
  formCardInserting.reset();
  addCardformValidator.resetError();
  openPopup(addCardPopup);
}

// popup open function for all elements: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// event listeners: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const popups = document.querySelectorAll('.popup')
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      // вот что я имел ввиду - https://postimg.cc/xNrh0zTZ
      if (evt.target.classList.contains('popup')
      || evt.target.classList.contains('popup__btn-close'))
        {
          closePopup(popup);
        }
    })
  })

const root = document.querySelector('.root');
buttonCard.addEventListener('click', openAddCardPopup);
buttonProfile.addEventListener('click', openProfilePopup);
formCardInserting.addEventListener('submit', saveCardHandler);
formProfileEditing.addEventListener('submit', saveProfileHandler);

// cards add from the array >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
initialCards.forEach(function (element) {
  const card = cardInstanceCreate(element);
  elementList.append(card);
});
