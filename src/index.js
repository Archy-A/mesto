import './pages/index.css';

import { Card } from './components/Card.js'
import { Section } from './components/Section.js'
import { PopupWithImage } from './components/PopupWithImage.js'
import { PopupWithForm } from './components/PopupWithForm.js'
import { UserInfo } from './components/UserInfo.js'
import { FormValidator } from './components/FormValidator.js'
import { initialCards,
         validationConfig,
         profilePopup,
         addCardPopup,
         profileInfoName,
         profileInfoActivity,
         inputFieldActivity,
         inputFieldName,
         buttonProfile,
         buttonCard,
         elementList,
       } from './utils/constants.js'

// prepare render function
function renderer (item) {
  const openPopupHandle = new PopupWithImage(item);
  openPopupHandle.setEventListeners();
  const card = new Card (item, '.element-template', () => openPopupHandle.open());
  const cardElement = card.cardCreate();
  this.addItem(cardElement);
}

// render cards from array
const defaultCardList = new Section({
  data: initialCards,
  renderer: renderer
}, elementList, 'manyCards');
defaultCardList.renderItems();

// create card's class instance for EDIT-PROFILE and CARD-ADD popups
const profileformValidator = new FormValidator (profilePopup, validationConfig);
profileformValidator.enableValidation();

const addCardformValidator = new FormValidator (addCardPopup, validationConfig);
addCardformValidator.enableValidation();

// add new card instance
const userInfo = new UserInfo(profileInfoName, profileInfoActivity);
const openProfile = new PopupWithForm(profilePopup,
  (item) => {
    userInfo.setUserInfo(item)
    openProfile.close();
  }
);
openProfile.setEventListeners();

// add new card instance
const openCard = new PopupWithForm(addCardPopup,
    (item) => {
      const openPopupHandle = new PopupWithImage(item);
      openPopupHandle.setEventListeners();
      const card = new Card (item, '.element-template', () => openPopupHandle.open());
      const cardElement = card.cardCreate();
      defaultCardList.howManyCards = 'oneCard'
      defaultCardList.addItem(cardElement);
      openCard.close();
    }
  );
openCard.setEventListeners();

buttonCard.addEventListener('click', () => {
  openCard.open();
  addCardformValidator.resetError();
});

buttonProfile.addEventListener('click', () => {
  openProfile.open();
  const userData = userInfo.getUserInfo();
  inputFieldName.value = userData.name;
  inputFieldActivity.value = userData.info;
  profileformValidator.resetError();
});
