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

// [...likeButtons].forEach(function (likeButton) {
//>>>>>>>>>>>>>>>>>>>>>>  LIKE  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// let likeButton = [];

// const likeFunc = function (element) {
//   let setLike = null;
//   const likeButton = element.querySelector('.element__like');
//   console.log(setLike);
//   likeButton.classList.add('element__like_pressed');

  // likeButton.addEventListener("click", () => {
  //   if (setLike) {
  //     console.log('like!');
  //     likeButton.classList.add('element__like_pressed');
  //     setLike = 'pressed';
  //   }
  //   else {
  //     likeButton.classList.remove('element__like_pressed');
  //     setLike = null;
  //   }
  // });
// }
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


const elementTemplate = document.querySelector('.element-template').content;
let elementList = document.querySelector('.elements');

initialCards.forEach(function (element) {
  const elementCard = elementTemplate.cloneNode(true);
  elementCard.querySelector('.element__picture').src = element.link;
  elementCard.querySelector('.element__name').textContent = element.name;

  const likeButton = elementCard.querySelector('.element__like');
  likeButton.addEventListener("click", () => {
    if (!likeButton.classList.contains('element__like_pressed')) {
      likeButton.classList.add('element__like_pressed');
    }
    else {
      likeButton.classList.remove('element__like_pressed');
    }
  });

  elementList.append(elementCard);
  // function handleDelete(e) {
//   const itemElement = e.target.closest('.item');
//   itemElement.remove();
});







//>>>>>>>>>>>>>>>>>>>>>>>>>  EDIT PROFILE & ADD NEW PLACE  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

  if (document.getElementsByName('profileName')[0].placeholder === 'Название') {
    const elementCard = elementTemplate.cloneNode(true);
    elementCard.querySelector('.element__name').textContent = popupEditName.value;
    elementCard.querySelector('.element__picture').src = popupEditActivity.value;
    const linkValid = popupEditActivity.value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (linkValid !=null) {
      elementList.prepend(elementCard);

//=============================
  const likeButton = document.querySelector('.element__like');
  likeButton.addEventListener("click", () => {
    if (!likeButton.classList.contains('element__like_pressed')) {
      likeButton.classList.add('element__like_pressed');
    }
    else {
      likeButton.classList.remove('element__like_pressed');
    }
   });
//=============================

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
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



// const TODOS = [
//   'Сделать проектную работу',
//   'Полить цветы',
//   'Пройти туториал по Реакту',
//   'Сделать фронт для своего проекта',
//   'Погулять c собакой',
//   'Разобраться в замыканиях',
//   'Решить задачу на Codewars',
// ];

// const listElement = document.querySelector('.app__list');
// const formElement = document.querySelector('.app__form');
// const inputElement = formElement.querySelector('.app__input');
// const templateElement = document.querySelector('.template');
// const submitButtonElement = document.querySelector('.app__submit-btn');

// let editedElement = null;

// function handleSubmit(e) {
//   e.preventDefault();

//   const text = inputElement.value;
//   inputElement.value = '';

//   if (editedElement) {
//     editedElement.querySelector('.item__text').textContent = text;
//     setAddMode();
//   } else {
//     const itemElement = createItem(text);
//     listElement.prepend(itemElement);
//   }
// }

// function handleDelete(e) {
//   const itemElement = e.target.closest('.item');
//   itemElement.remove();
// }

// function handleEdit(e) {
//   const itemElement = e.target.closest('.item');
//   setEditMode(itemElement);
// }

// function handleDuplicate(e) {
//   const itemElement = e.target.closest('.item');
//   const clone = itemElement.cloneNode(true);
//   addListeners(clone);
//   itemElement.after(clone);
// }

// function setEditMode(elem) {
//   const text = elem.querySelector('.item__text').textContent;
//   inputElement.value = text;
//   inputElement.focus();

//   submitButtonElement.textContent = 'Сохранить';
//   editedElement = elem;
// }

// function setAddMode() {
//   editedElement = null;
//   submitButtonElement.textContent = 'Добавить';
// }

// function addListeners(element) {
//   element
//     .querySelector('.item__btn_type_delete')
//     .addEventListener('click', handleDelete);

//   element
//     .querySelector('.item__btn_type_edit')
//     .addEventListener('click', handleEdit);

//   element
//     .querySelector('.item__btn_type_duplicate')
//     .addEventListener('click', handleDuplicate);
// }

// function createItem(text) {
//   const newItemElement = templateElement.content.cloneNode(true);
//   newItemElement.querySelector('.item__text').textContent = text;
//   addListeners(newItemElement);
//   return newItemElement;
// }

// TODOS.forEach((text) => {
//   const itemElement = createItem(text);
//   listElement.prepend(itemElement);
// });

// formElement.addEventListener('submit', handleSubmit);










//******************************************************** */



// //>>>>>>>>>>>>>>>>>>>>>>> EDIT PROFILE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const popup = document.querySelector('.popup');
// const editButton = document.querySelector('.profile__edit-button');
// const formSubmit = popup.querySelector('.popup__content');
// const profileInfoName = document.querySelector('.profile__name');
// const profileInfoActivity = document.querySelector('.profile__activity');
// const popupEditName = popup.querySelector('.popup__edit_name_copy');
// const popupEditActivity = popup.querySelector('.popup__edit_activity_title');
// const closeEditButton = popup.querySelector('.popup__close');

// const togglePopup = function () {
//   if (!popup.classList.contains('popup_opened')) {
//     popupEditName.value = profileInfoName.textContent;
//     popupEditActivity.value = profileInfoActivity.textContent;
//   }
//   popup.classList.toggle('popup_opened');
// }

// closeEditButton.addEventListener('click', togglePopup);
// editButton.addEventListener('click', togglePopup);

// const saveProfile = function (evt) {
//   evt.preventDefault();
//   profileInfoName.textContent = popupEditName.value;
//   profileInfoActivity.textContent = popupEditActivity.value;
//   togglePopup();
// }

// formSubmit.addEventListener('submit', saveProfile);
// //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



// //>>>>>>>>>>>>>>>>>>>>>>> ADD NEW PLACE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const popupPhoto = document.querySelector('.popup-photo');
// const addButton = document.querySelector('.profile__add-button');

// const togglePopup1 = function () {
//   popupPhoto.classList.toggle('popup-photo_opened');
// }

// addButton.addEventListener('click', togglePopup1);


// //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<







// //>>>>>>>>>   Add photo from array    >>>>>>>>>>>>>>>>>
// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

// const elementTemplate = document.querySelector('.element-template').content;
// const elementList = document.querySelector('.elements');

// initialCards.forEach(function (element) {
//   const elementCard = elementTemplate.cloneNode(true);
//   elementCard.querySelector('.element__picture').src = element.link;
//   elementCard.querySelector('.element__name').textContent = element.name;
//   elementList.append(elementCard);
// })

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

