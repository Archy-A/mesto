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
         cardPopup,
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

const cardformValidator = new FormValidator (cardPopup, validationConfig);
cardformValidator.enableValidation();

// add new card instance
const userInfo = new UserInfo(profileInfoNameSelector, profileInfoActivitySelector);
const profilePopupSelector = '.popup-edit';
const popupProfileForm = new PopupWithForm(profilePopupSelector,
  (item) => {
    userInfo.setUserInfo(item)
    popupProfileForm.close();
  }
);
popupProfileForm.setEventListeners();

// add new card instance
const PopupCardForm = new PopupWithForm(CardPopupSelector,
    (item) => {
      const cardElement = createCard(item, elementTemplatSelector);
      defaultCardList.addItem(cardElement,);
      PopupCardForm.close();
    }
  );
PopupCardForm.setEventListeners();

buttonCard.addEventListener('click', () => {
  PopupCardForm.open();
  cardformValidator.resetError();
});

buttonProfile.addEventListener('click', () => {
  popupProfileForm.open();
  const userData = userInfo.getUserInfo();
  inputFieldName.value = userData.name;
  inputFieldActivity.value = userData.info;
  profileformValidator.resetError();
});
