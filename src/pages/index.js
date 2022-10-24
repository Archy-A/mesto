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
         ServerInfoData,
         token,
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

// Api for cards
const apiCards = new Api (
  {
    baseUrl: 'cards',
    headers: {
      authorization: token,
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


// Api for user
const apiUser = new Api (
  {
    baseUrl: 'users/me',
    headers: {
      authorization: token,
    }
  }
)

// function for getting user info from server
function getUserInfoFromServer () {
  return apiUser.getUserInfo().then( (data) => {
      return data;
    })
}

const userInfo = new UserInfo(profileInfoNameSelector, profileInfoActivitySelector, profileInfoAvatar);

// await apiUser.setUserInfo();
const userInforServer = await getUserInfoFromServer();
userInfo.setUserInfo(userInforServer);
// console.log(userInforServer);


// user info
const profilePopupSelector = '.popup-edit';
const popupProfileForm = new PopupWithForm(profilePopupSelector,
  (item) => {
    userInfo.setUserInfo(item)
    apiUser.setUserInfo(ServerInfoData.baseUrl,
                        ServerInfoData.headers,
                        userInfo.getUserInfo().name,
                        userInfo.getUserInfo().info);
    popupProfileForm.close();
  }
);
popupProfileForm.setEventListeners();


// add new card instance
const popupCardForm = new PopupWithForm(cardPopupSelector,
    (item) => {
      const cardElement = createCard(item, elementTemplatSelector);
      defaultCardList.addItem(cardElement);
      apiCards.setCard(ServerInfoData.headers,
                       item.name,
                       item.link)
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
