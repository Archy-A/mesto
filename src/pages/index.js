// import './index.css';

import { Card } from '../components/Card.js'
import { Api } from '../components/Api.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js'
import { validationConfig,
         ServerInfoData,
         token,
         ava,
         profilePopup,
         cardPopup,
         inputFieldActivity,
         inputFieldName,
         buttonProfile,
         buttonCard,
         imagePopupSelector,
         cardPopupSelector,
         avaPopupSelector,
         containerSelector,
         profileInfoNameSelector,
         profileInfoActivitySelector,
         profileInfoAvatar
       } from '../utils/constants.js'

// Api for cards
const apiCards = new Api (
  {
    baseUrl: 'cards',
    headers: {
      authorization: token,
    }
  }
);

const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();

const deletePopupSelector = '.popup-delete';
const popupDeleteForm = new PopupWithConfirmation(deletePopupSelector);
popupDeleteForm.setEventListeners();


// create card function
const elementTemplatSelector = '.element-template';
function createCard (item, elementTemplatSelector) {
  const card = new Card (item,
                         elementTemplatSelector,
                         () => popupImage.open(item),
                         popupDeleteForm,
                         apiCards.deleteCard,
                         apiCards.likeCard,
                         );
  const cardElement = card.cardCreate();
  return cardElement;
}



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

// load user information from server
const userInfo = new UserInfo(profileInfoNameSelector, profileInfoActivitySelector, profileInfoAvatar);
const userInforServer = await getUserInfoFromServer();
userInfo.setUserInfo(userInforServer);

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
      apiCards.setCard(ServerInfoData.headers,
                       item.name,
                       item.link)
        .then(card => {
          const cardElement = createCard(card, elementTemplatSelector);
          defaultCardList.addItem(cardElement);
        });
      popupCardForm.close();
    }
  );
popupCardForm.setEventListeners();


// add ava popup instance
const popupAvaForm = new PopupWithForm(avaPopupSelector,
  (link) => {
    apiCards.setAva(ServerInfoData.headers, link)
      .then(avaFormServer => {
      ava.src = avaFormServer["avatar"]
      });
    popupAvaForm.close();
  }
);
popupAvaForm.setEventListeners();



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

ava.addEventListener('click', () => {
  popupAvaForm.open();
})
