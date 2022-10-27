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
         ava,
         buttonSaveAva,
         buttonSaveCard,
         buttonSaveProfile,
         avaOnhover,
         avaPopup,
         profilePopup,
         alertMessage,
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


// Api instance creation
const api = new Api (
  {
    baseUrl: ['cards', 'users/me']
  }
);

// function for getting user info from server
function getUserInfoFromServer () {
  return api.getUserInfo()
  .then( (data) => {
      return data;
    })
  .catch((err) => {
    console.log(err);
  });
}

// load user information from server
const userInfo = new UserInfo(profileInfoNameSelector, profileInfoActivitySelector, profileInfoAvatar);
const userInforServer = await getUserInfoFromServer();
userInfo.setUserInfo(userInforServer);

// set my Id from server to API instance
const myId = userInforServer._id;
api.setId(myId);

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
                         api.deleteCard,
                         api.likeCard,
                         myId,
                         );
  const cardElement = card.cardCreate();
  return cardElement;
}

// function for getting cards from server
function getCardsFromServer () {
  return api.getInitialCards()
    .then( (data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

// render card function
function renderer (item) {
  const cardElement = createCard(item, elementTemplatSelector);
  this.addItemAppend(cardElement);
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

const avaFormValidator = new FormValidator (avaPopup, validationConfig);
avaFormValidator.enableValidation();


// user info
const profilePopupSelector = '.popup-edit';
const popupProfileForm = new PopupWithForm(profilePopupSelector,
  (item) => {
    buttonSaveProfile.textContent = 'Сохранение...';
    api.setUserInfo(ServerInfoData.baseUrl,
                    item.name,
                    item.about
                    )
              .then( () => {
                buttonSaveProfile.textContent = 'Сохранить';
                userInfo.setUserInfo(item)
                popupProfileForm.close();
              })
              .catch((err) => {
                console.log(err);
                window.alert(`${alertMessage} ${err}`);
              })
              .finally(() => {
                buttonSaveProfile.textContent = 'Сохранить';
              })
  }
);
popupProfileForm.setEventListeners();

// add new card instance
const popupCardForm = new PopupWithForm(cardPopupSelector,
    (item) => {
      buttonSaveCard.textContent = 'Создание...';
      api.setCard(item.name,
                       item.link)
        .then(card => {
          const cardElement = createCard(card, elementTemplatSelector);
          defaultCardList.addItemPrepend(cardElement);
          buttonSaveCard.textContent = 'Создать';
          popupCardForm.close();
        })
        .catch((err) => {
          console.log(err);
          window.alert(`${alertMessage} ${err}`);
        })
        .finally(() => {
          buttonSaveCard.textContent = 'Создать';
        })
    }
  );
popupCardForm.setEventListeners();

// add ava popup instance
const popupAvaForm = new PopupWithForm(avaPopupSelector,
  (link) => {
    buttonSaveAva.textContent = 'Сохранение...';
    api.setAva(link)
      .then(avaFormServer => {
        ava.src = avaFormServer["avatar"]
        buttonSaveAva.textContent = 'Сохранить';
        popupAvaForm.close();
      })
      .catch((err) => {
        console.log(err);
        window.alert(`${alertMessage} ${err}`);
      })
      .finally(() => {
        buttonSaveAva.textContent = 'Сохранить';
      })
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

avaOnhover.addEventListener('click', () => {
  popupAvaForm.open();
  avaFormValidator.resetError();
})
