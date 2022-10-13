import { Card } from '../components/Card.js'
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
    const card = new DefaultCard(item, '.default-card');
    const cardElement = card.generateCard();
    defaultCardList.setItem(cardElement);

    const card1 = new Card (item, '.element-template', openPopup);
    const cardElement1 = card1.cardCreate();
    defaultCardList.setItem(cardElement1);
  }
}, cardListSelector);


const cardInstanceCreate = function (element) {
  const elementCard = new Card (element.name, element.link, '.element-template', openPopup);
  return elementCard.cardCreate();
}
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

// // card create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const cardInstanceCreate = function (element) {
//   const elementCard = new Card (element.name, element.link, '.element-template', openPopup);
//   return elementCard.cardCreate();
// }

// save(add) new card >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const saveCardHandler = function (evt) {
  evt.preventDefault();
  const element = {
    name: cardName.value,
    link: cardLink.value
    };
  const card = cardInstanceCreate(element);
  elementList.prepend(card);
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

// cards add from the array >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
initialCards.forEach(function (element) {
  const card = cardInstanceCreate(element);
  elementList.append(card);
});
