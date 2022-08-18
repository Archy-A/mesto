const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const formSubmit = popup.querySelector('.popup__content');
const closeEditButton = popup.querySelector('.popup__close');
const profileInfoName = document.querySelector('.profile__name');
const profileInfoActivity = document.querySelector('.profile__activity');
const popupEditName = popup.querySelector('.popup__edit_name_copy');
const popupEditActivity = popup.querySelector('.popup__edit_activity_title');


const togglePopup = function () {
  if (!popup.classList.contains('popup_opened')) {
    popupEditName.value = profileInfoName.textContent;
    popupEditActivity.value = profileInfoActivity.textContent;
  }
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', togglePopup);
closeEditButton.addEventListener('click', togglePopup);

const saveProfile = function (evt) {
  evt.preventDefault();
  profileInfoName.textContent = popupEditName.value;
  profileInfoActivity.textContent = popupEditActivity.value;
  togglePopup();
}

formSubmit.addEventListener('submit', saveProfile);

//>>>>>>>>>   Add photo from array    >>>>>>>>>>>>>>>>>
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

const elementTemplate = document.querySelector('.element-template').content;
const elementList = document.querySelector('.elements');

initialCards.forEach(function (element) {
  const elementCard = elementTemplate.cloneNode(true);
  elementCard.querySelector('.element__picture').src = element.link;
  elementCard.querySelector('.element__name').textContent = element.name;
  elementList.append(elementCard);
})

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

