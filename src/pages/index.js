import './index.css';

import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js'
import { initialCards,
         validationConfig,
         profilePopup,
         CardPopup,
         inputFieldActivity,
         inputFieldName,
         buttonProfile,
         buttonCard,
         imagePopupSelector,
         CardPopupSelector,
         containerSelector,
         profileInfoNameSelector,
         profileInfoActivitySelector
       } from '../utils/constants.js'

const openPopupHandle = new PopupWithImage(imagePopupSelector);
openPopupHandle.setEventListeners();

// create card function
const elementTemplatSelector = '.element-template';
function createCard (item, elementTemplatSelector) {
  const card = new Card (item, elementTemplatSelector, () => openPopupHandle.open(item));
  const cardElement = card.cardCreate();
  return cardElement;
}

// prepare render function
function renderer (item) {
  const cardElement = createCard(item, elementTemplatSelector);
  this.addItem(cardElement);
}

// render cards from array
const defaultCardList = new Section({
  data: initialCards,
  renderer: renderer
}, containerSelector);
defaultCardList.renderItems();

// create card's class instance for EDIT-PROFILE and CARD-ADD popups
const profileformValidator = new FormValidator (profilePopup, validationConfig);
profileformValidator.enableValidation();

const CardformValidator = new FormValidator (CardPopup, validationConfig);
CardformValidator.enableValidation();

// add new card instance
const userInfo = new UserInfo(profileInfoNameSelector, profileInfoActivitySelector);
const profilePopupSelector = '.popup-edit';
const PopupProfileForm = new PopupWithForm(profilePopupSelector,
  (item) => {
    userInfo.setUserInfo(item)
    PopupProfileForm.close();
  }
);
PopupProfileForm.setEventListeners();

// add new card instance
const PopupCardForm = new PopupWithForm(CardPopupSelector,
    (item) => {
      const card = new Card (item, '.element-template', () => openPopupHandle.open(item));
      const cardElement = card.cardCreate();
      defaultCardList.addItem(cardElement,);
      PopupCardForm.close();
    }
  );
PopupCardForm.setEventListeners();

buttonCard.addEventListener('click', () => {
  PopupCardForm.open();
  CardformValidator.resetError();
});

buttonProfile.addEventListener('click', () => {
  PopupProfileForm.open();
  const userData = userInfo.getUserInfo();
  inputFieldName.value = userData.name;
  inputFieldActivity.value = userData.info;
  profileformValidator.resetError();
});
