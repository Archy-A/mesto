import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { FormValidator } from '../components/FormValidator.js'
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
         cardName,
         cardLink,
         formCardInserting,
         formProfileEditing,
       } from '../utils/constants.js'

//// SECTION TESTS ////////////////////////////////////////////////////////
const defaultCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card (item, '.element-template', openPopup);
    const cardElement = card.cardCreate();
    defaultCardList.addItem(cardElement);
  }
}, elementList, 'manyCards');

defaultCardList.renderItems();
///////////////////////////////////////////////////////////////////////////


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
  closePopup(profilePopup);
}

// save(add) new card >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const saveCardHandler = function (evt) {
  evt.preventDefault();
  const element = [{
    name: cardName.value, // .popup__edit_card-name
    link: cardLink.value // .popup__edit_cardlink
    }];

  const oneCard = new Section({
    data: element,
    renderer: (item) => {
      const card = new Card (item, '.element-template', openPopup);
      const cardElement = card.cardCreate();
      oneCard.addItem(cardElement);
    }
  }, elementList, 'oneCard');
  oneCard.renderItems();
  closePopup(addCardPopup);
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
      if (evt.target.classList.contains('popup')
       || evt.target.classList.contains('popup__btn-close')
       || evt.target.classList.contains('popup-photo__container')
       || evt.target.classList.contains('popup__container'))
        {
          closePopup(popup);
        }
    })
  })

buttonCard.addEventListener('click', openAddCardPopup);
buttonProfile.addEventListener('click', openProfilePopup);
formCardInserting.addEventListener('submit', saveCardHandler);
formProfileEditing.addEventListener('submit', saveProfileHandler);
