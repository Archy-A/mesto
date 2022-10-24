// import './index.css';

import { Card } from '../components/Card.js'
import { Api } from '../components/Api.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js'
import { //initialCards,
         validationConfig,
         profilePopup,
         cardPopup,
         inputFieldActivity,
         inputFieldName,
         buttonProfile,
         buttonCard,
         imagePopupSelector,
         cardPopupSelector,
         containerSelector,
         profileInfoNameSelector,
         profileInfoActivitySelector,
         profileInfoAvatar
       } from '../utils/constants.js'

const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();

// create card function
const elementTemplatSelector = '.element-template';
function createCard (item, elementTemplatSelector) {
  const card = new Card (item, elementTemplatSelector, () => popupImage.open(item));
  const cardElement = card.cardCreate();
  return cardElement;
}

// prepare render function
// function renderer (item) {
//   const cardElement = createCard(item, elementTemplatSelector);
//   this.addItem(cardElement);
// }

// render cards from array
// const defaultCardList = new Section({
//   data: initialCards,
//   renderer: renderer
// }, containerSelector);
// defaultCardList.renderItems();


// Api for cards
const apiCards = new Api (
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52/cards',
    headers: {
      authorization: '395bc3aa-f34f-406b-9552-e0d3786795c0',
    }
  }
)

// function for getting cards from server
function getCardsFromServer () {
  return apiCards.getInitialCards().then( (data) => {
      return data;
    })
}

// render card function
function renderer (item) {
  const cardElement = createCard(item, elementTemplatSelector);
  this.addItem(cardElement);
}

// render cards from array
const initialCards = await getCardsFromServer();
const defaultCardList = new Section({
  data: initialCards,
  renderer: renderer
}, containerSelector);
defaultCardList.renderItems();



// create card's class instance for EDIT-PROFILE and CARD-ADD popups
const profileformValidator = new FormValidator (profilePopup, validationConfig);
profileformValidator.enableValidation();

const cardformValidator = new FormValidator (cardPopup, validationConfig);
cardformValidator.enableValidation();

// add new card instance
const userInfo = new UserInfo(profileInfoNameSelector, profileInfoActivitySelector, profileInfoAvatar);
const profilePopupSelector = '.popup-edit';
const popupProfileForm = new PopupWithForm(profilePopupSelector,
  (item) => {
    userInfo.setUserInfo(item)
    popupProfileForm.close();
  }
);
popupProfileForm.setEventListeners();


// Api for user
const apiUser = new Api (
  {
    baseUrl: 'https://nomoreparties.co/v1/cohort-52/users/me',
    headers: {
      authorization: '395bc3aa-f34f-406b-9552-e0d3786795c0',
    }
  }
)

// function for getting user info from server
function getUserInfoFromServer () {
  return apiUser.getUserInfo().then( (data) => {
      return data;
    })
}

const userInforServer = await getUserInfoFromServer();
userInfo.setUserInfo(userInforServer)
console.log(userInforServer)


// add new card instance
const popupCardForm = new PopupWithForm(cardPopupSelector,
    (item) => {
      const cardElement = createCard(item, elementTemplatSelector);
      defaultCardList.addItem(cardElement,);
      popupCardForm.close();
    }
  );
popupCardForm.setEventListeners();

buttonCard.addEventListener('click', () => {
  popupCardForm.open();
  cardformValidator.resetError();
});

buttonProfile.addEventListener('click', () => {
  popupProfileForm.open();
  const userData = userInfo.getUserInfo();
  inputFieldName.value = userData.name;
  inputFieldActivity.value = userData.info;
  profileformValidator.resetError();
});


