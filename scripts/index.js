const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const formSubmit = popup.querySelector('.popup__content');
const profileInfoName = document.querySelector('.profile__name');
const profileInfoActivity = document.querySelector('.profile__activity');
const popupEditName = popup.querySelector('.popup__edit_name_copy');
const popupEditActivity = popup.querySelector('.popup__edit_activity_title');
const closeEditButton = popup.querySelector('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const popupHeader = popup.querySelector('.popup__header');
const popupSaver = popup.querySelector('.popup__save-info');
const closePhotoButton = document.querySelector('.popup-photo__close');

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

function likeHandler (elementCard) {
  const likeButton = elementCard.querySelector('.element__like');
  likeButton.addEventListener("click", () => {
    if (!likeButton.classList.contains('element__like_pressed')) {
      likeButton.classList.add('element__like_pressed');
    }
    else {
      likeButton.classList.remove('element__like_pressed');
    }
  });
}

function deleteHandler (elementCard) {
  const deleteButton = elementCard.querySelector('.element__bin');
    deleteButton.addEventListener("click", (elementCard) => {
      const itemElement = elementCard.target.closest('.element');
      itemElement.remove();
    });
}

const closePopupFullviewHandler = function () {
  const popupFullview = document.querySelector('.popup-photo');
  popupFullview.classList.remove('popup-photo_opened');
}
closePhotoButton.addEventListener('click', closePopupFullviewHandler);

const togglePopupFullview = function (elementCard) {
  const popupFullview = document.querySelector('.popup-photo');
  const elementFullview = elementCard.querySelector('.element__picture');
  const elementLink = elementCard.querySelector('.element__picture').src;
  elementFullview.addEventListener("click", () => {
    const popupPhotoName = popupFullview.querySelector('.popup-photo__name');
    const popupPhotoLink = popupFullview.querySelector('.popup-photo__fullview');
    popupPhotoName.textContent = elementFullview.textContent;
    popupPhotoLink.src = elementLink;
    popupFullview.classList.toggle('popup-photo_opened');
  });
}

const elementTemplate = document.querySelector('.element-template').content;
let elementList = document.querySelector('.elements');

initialCards.forEach(function (element) {
  const elementCard = elementTemplate.cloneNode(true);
  elementCard.querySelector('.element__picture').src = element.link;
  elementCard.querySelector('.element__name').textContent = element.name;
  likeHandler(elementCard);
  deleteHandler(elementCard);
  togglePopupFullview(elementCard);
  elementList.append(elementCard);
});

const togglePopup = function (evt) {
  if ((evt.target.classList.value === 'profile__edit-button') && (!popup.classList.contains('popup_opened'))) {
      popupHeader.textContent = 'Редактировать профиль';
      const popupSaveName = popup.querySelector('.popup__save-info');
      popupSaveName.textContent = 'Сохранить';
      popupEditName.value = profileInfoName.textContent;
      popupEditActivity.value = profileInfoActivity.textContent;
      document.getElementsByName('profileName')[0].placeholder='Имя';
   }

  else if ((evt.target.classList.value === 'profile__add-button') && (!popup.classList.contains('popup_opened'))) {
      popupHeader.textContent = 'Новое место';
      document.getElementsByName('profileName')[0].placeholder='Название';
      document.getElementsByName('profileActivity')[0].placeholder='Ссылка на картинку';
      popupEditName.value = 'Название';
      popupEditActivity.value = 'Ссылка на картинку';
      const popupSaveName = popup.querySelector('.popup__save-info');
      popupSaveName.textContent = 'Создать';
   }

  popup.classList.toggle('popup_opened');
}

closeEditButton.addEventListener('click', togglePopup);
editButton.addEventListener('click', togglePopup);
addButton.addEventListener('click', togglePopup);

const saveButton = function (evt) {
  evt.preventDefault();
  const elementCard = elementTemplate.cloneNode(true);
  if (document.getElementsByName('profileName')[0].placeholder === 'Название') {
    elementCard.querySelector('.element__name').textContent = popupEditName.value;
    elementCard.querySelector('.element__picture').src = popupEditActivity.value;
    const linkValid = popupEditActivity.value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (linkValid !=null) {
      likeHandler(elementCard);
      deleteHandler(elementCard);
      togglePopupFullview(elementCard);
      elementList.prepend(elementCard);
      togglePopup(evt);
    }
    else {
      popupEditActivity.value = 'ВВЕДИТЕ КОРРЕКТНУЮ ССЫЛКУ!!!';
    }
  }
  else {
      profileInfoName.textContent = popupEditName.value;
      profileInfoActivity.textContent = popupEditActivity.value;
      togglePopup(evt);
    }
}

formSubmit.addEventListener('submit', saveButton);
