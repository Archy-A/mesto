const mainPopup = document.querySelector('.popup');
const profileInfoName = document.querySelector('.profile__name');
const profileInfoActivity = document.querySelector('.profile__activity');
const profilePopup = document.querySelector('.popup-edit');
const popupEditActivity = profilePopup.querySelector('.popup__edit_activity_title');

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


const createCard = function (element) {
  const elementCardTemplate = elementTemplate.cloneNode(true);
  const elementCard = elementCardTemplate.querySelector('.element');
  elementCard.querySelector('.element__name').textContent = element.name;
  const cardImage = elementCard.querySelector('.element__picture');
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardImage.addEventListener('click', onclick);
  likeHandler(elementCard);
  deleteHandler(elementCard);
  return elementCardTemplate;
}

function likeHandler (elementCard) {
  const likeButton = elementCard.querySelector('.element__like');
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle('element__like_pressed');
  });
}

function deleteHandler (elementCard) {
  const deleteButton = elementCard.querySelector('.element__bin');
    deleteButton.addEventListener("click", () => {
      elementCard.remove();
    });
}

const saveProfileHandler = function (evt) {
  evt.preventDefault();
  profileInfoName.textContent = popupEditName.value;
  profileInfoActivity.textContent = popupEditActivity.value;
  popupClose(evt);
}

const formEditPopup = document.querySelector('.popup__edit-form');
formEditPopup.addEventListener('submit', saveProfileHandler);

const saveCardHandler = function (evt) {
  evt.preventDefault();
  const popupCardName = document.querySelector('.popup__edit_card-name');
  const popupCardLink = document.querySelector('.popup__edit_card-link');
  const element = {
    name: popupCardName.value,
    link: popupCardLink.value
    };
  const elementCard = createCard(element);
  elementList.prepend(elementCard);
  popupClose(evt.target);
}

const formAddPopup = document.querySelector('.popup__add-form');
formAddPopup.addEventListener('submit', saveCardHandler);

const popupCardName = document.querySelector('.popup__edit_card-name');
popupCardName.addEventListener('focus', function() {
  popupCardName.setAttribute('placeholder', '');
});

const popupCardLink = document.querySelector('.popup__edit_card-link');
popupCardLink.addEventListener('focus', function() {
  popupCardLink.setAttribute('placeholder', '');
});

const cardPopup = document.querySelector('.popup-add');
const imagePopup = document.querySelector('.popup-photo');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditName = profilePopup.querySelector('.popup__edit_name_copy');

const onclick = function (evt) {
  popupOpen(evt.target);
}

const popupOpen = function (element) {
  if ((element.classList.value === 'profile__edit-button') && (!element.classList.contains('popup-visual'))) {
    profilePopup.classList.remove('popup-add');
    profilePopup.classList.add('popup-edit');
    profilePopup.classList.add('popup-visual');
    popupEditName.value = profileInfoName.textContent;
    popupEditActivity.value = profileInfoActivity.textContent;
   }

   else if ((element.classList.value === 'profile__add-button') && (!element.classList.contains('popup-visual'))) {
    cardPopup.classList.remove('popup-edit');
    cardPopup.classList.add('popup-add');
    cardPopup.classList.add('popup-visual');
    const popupCardName = document.querySelector('.popup__edit_card-name');
    const popupCardLink = document.querySelector('.popup__edit_card-link');
    popupCardName.value = '';
    popupCardLink.value = '';
    popupCardName.setAttribute('placeholder', 'Название');
    popupCardLink.setAttribute('placeholder', 'Ссылка на картинку');
   }

   else if ((element.classList.value === 'element__picture')) {
    const imagePopup = document.querySelector('.popup-photo');
    const popupPhotoName = imagePopup.querySelector('.popup-photo__name');
    const popupPhotoLink = imagePopup.querySelector('.popup-photo__fullview');
    popupPhotoName.textContent = element.alt;
    popupPhotoLink.src = element.src;
    imagePopup.classList.add('popup-visual');
 }
}

const popupClose = function () {
  profilePopup.classList.remove('popup-visual');
  cardPopup.classList.remove('popup-visual');
  imagePopup.classList.remove('popup-visual');
}

const closeButton = document.querySelectorAll('.popup__btn-close');
[...closeButton].forEach((closeButton) =>
   closeButton.addEventListener('click', popupClose));

addButton.addEventListener('click', onclick);
editButton.addEventListener('click', onclick);

const elementTemplate = document.querySelector('.element-template').content;
const elementList = document.querySelector('.elements');

initialCards.forEach(function (element) {
  const elementCard = createCard(element);
  elementList.append(elementCard);
});
