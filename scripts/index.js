const Popup = document.querySelector('.popup');

const profilePopup = document.querySelector('.popup-edit');
const cardPopup = document.querySelector('.popup-add');
const imagePopup = document.querySelector('.popup-photo');

const profileInfoName = document.querySelector('.profile__name');
const profileInfoActivity = document.querySelector('.profile__activity');
const inputFieldActivity = profilePopup.querySelector('.popup__edit_activity_title');
const inputFieldName = profilePopup.querySelector('.popup__edit_name_copy');
const buttonProfile = document.querySelector('.profile__edit-button');
const buttonCard = document.querySelector('.profile__add-button');
const elementTemplate = document.querySelector('.element-template').content;
const elementList = document.querySelector('.elements');
const cardName = cardPopup.querySelector('.popup__edit_card-name');
const cardLink = cardPopup.querySelector('.popup__edit_card-link');
const popupPhotoName = imagePopup.querySelector('.popup-photo__name');
const popupPhotoImg = imagePopup.querySelector('.popup-photo__fullview');
const formCardInserting = document.querySelector('.popup__add-form');
const formProfileEditing = document.querySelector('.popup__edit-form');
const editField = profilePopup.querySelector('.popup__edit');

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

// create card from template >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const createCard = function (element) {
  const elementCardTemplate = elementTemplate.cloneNode(true);
  const elementCard = elementCardTemplate.querySelector('.element');
  elementCard.querySelector('.element__name').textContent = element.name;
  const cardImage = elementCard.querySelector('.element__picture');
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardImage.addEventListener('click', () => openImagePopup(element));

  likeHandler(elementCard);
  deleteHandler(elementCard);
  return elementCardTemplate;
}

// like: add/remove >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function likeHandler (elementCard) {
  const likeButton = elementCard.querySelector('.element__like');
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle('element__like_pressed');
  });
}

// remove card  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function deleteHandler (elementCard) {
  const deleteButton = elementCard.querySelector('.element__bin');
    deleteButton.addEventListener("click", () => {
      elementCard.remove();
    });
}

// save(add) profile information >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const saveProfileHandler = function (evt) {
  evt.preventDefault();
  profileInfoName.textContent = inputFieldName.value;
  profileInfoActivity.textContent = inputFieldActivity.value;
  onClosePopupRequest(evt);
}

// save(add) new card >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const saveCardHandler = function (evt) {
  evt.preventDefault();
  const element = {
    name: cardName.value,
    link: cardLink.value
    };
  const elementCard = createCard(element);
  elementList.prepend(elementCard);
  onClosePopupRequest(evt);
}

// OnClick processors for profilePopup, cardPopup, imagePopup: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function openPropfilePopup() {
  inputFieldName.value = profileInfoName.textContent;
  inputFieldActivity.value = profileInfoActivity.textContent;
  isValid(profilePopup, editField, validationConfig);
  const inputList = Array.from(profilePopup.querySelectorAll('.popup__edit'));
  const buttonElement = profilePopup.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement, validationConfig);
  openPopup(profilePopup);
}

function openAddCardPopup() {
  cardName.value = '';
  cardLink.value = '';
  openPopup(cardPopup);
  const inputList = Array.from(cardPopup.querySelectorAll('.popup__edit'));
  const buttonElement = cardPopup.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement, validationConfig);
}

function openImagePopup(imageElement) {
  popupPhotoName.textContent = imageElement.name;
  popupPhotoImg.src = imageElement.link;
  popupPhotoImg.alt = imageElement.name;
  openPopup(imagePopup);
}

// popup open function for all elements: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function openPopup(popup) {
  popup.classList.add('popup-opened');
}

// popup close function for all elements: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function onClosePopupRequest(evt) {
  const popup = evt.target.closest(".popup");
  closePopup(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup-opened');
}

// event listeners: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const closeButtonList = document.querySelectorAll('.popup__btn-close');
[...closeButtonList].forEach((closeButtonList) =>
   closeButtonList.addEventListener('click', onClosePopupRequest));

buttonCard.addEventListener('click', openAddCardPopup);
buttonProfile.addEventListener('click', openPropfilePopup);

formCardInserting.addEventListener('submit', saveCardHandler);
formProfileEditing.addEventListener('submit', saveProfileHandler);

// cards add from the array >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
initialCards.forEach(function (element) {
  const elementCard = createCard(element);
  elementList.append(elementCard);
});
