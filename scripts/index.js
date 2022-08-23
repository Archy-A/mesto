const popup = document.querySelector('.popup');

const formSubmit = popup.querySelector('.popup__form');
const profileInfoName = document.querySelector('.profile__name');
const profileInfoActivity = document.querySelector('.profile__activity');
const popupHeader = popup.querySelector('.popup__header');
const popupSaver = popup.querySelector('.popup__save');
const closePhotoButton = document.querySelector('.popup-photo__close');
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

const saveProfileHandler = function (evt) {
  evt.preventDefault();
  console.log(popupEditActivity.value);
  profileInfoName.textContent = popupEditName.value;
  profileInfoActivity.textContent = popupEditActivity.value;
  popupClose(evt);
}
const formEditPopup = document.querySelector('.popup__edit-form');
formEditPopup.addEventListener('submit', saveProfileHandler);


const saveCardHandler = function (evt) {
  evt.preventDefault();
  const elementCard = elementTemplate.cloneNode(true);
  const popupCardName = document.querySelector('.popup__edit_card-name');
  const popupCardLink = document.querySelector('.popup__edit_card-link');
  elementCard.querySelector('.element__name').textContent = popupCardName.value;
  elementCard.querySelector('.element__picture').src = popupCardLink.value;
  const linkValid = popupCardLink.value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (linkValid !=null) {
      likeHandler(elementCard);
      deleteHandler(elementCard);
      togglePopupFullview(elementCard);
      elementList.prepend(elementCard);
      popupClose(evt);
    }
    else {
      popupCardLink.value = 'ВВЕДИТЕ КОРРЕКТНУЮ ССЫЛКУ!!!';
      console.log(popupCardLink.value);
    }
}

const formAddPopup = document.querySelector('.popup__add-form');
formAddPopup.addEventListener('submit', saveCardHandler);

const popupCardName = document.querySelector('.popup__edit_card-name');
popupCardName.addEventListener('focus', function() {
  popupCardName.setAttribute('placeholder', '')
});

const popupCardLink = document.querySelector('.popup__edit_card-link');
popupCardLink.addEventListener('focus', function() {
  popupCardLink.setAttribute('placeholder', '')
});
//==============================================

// //>>>>
// // 1. Acquire a reference to our <form>.
// //    This can also be done by setting <form name="blub" id="myAwsomeForm">:
// //       var form = document.forms.blub;

// var form = document.getElementById("myAwsomeForm");

// // 2. Get a reference to our preferred element (link/button, see below) and
// //    add an event listener for the "click" event.
// document.getElementById("your-link-or-button-id").addEventListener("click", function () {
//   form.submit();
// });

// // 3. any site in your javascript code:
// document.getElementById('myAwsomeForm').submit();
// //<<<<




/* <input type="submit" name="btn1" id="btn1" value="Submit"/>

$("#btn1").click(function(){
$("#frm1").submit();
}

<input type="submit" name="btn2" id="btn2" value="Submit"/>

$("#btn2").click(function(){
$("#frm1").submit();
} */

// const closeButton = document.querySelectorAll('.popup__btn-close');
// [...closeButton].forEach((closeButton) =>
//    closeButton.addEventListener('click', popupClose));




// const closePopupFullviewHandler = function () {
//   const popupFullview = document.querySelector('.popup-photo');
//   popupFullview.classList.remove('popup-photo_opened');
// }
// closePhotoButton.addEventListener('click', closePopupFullviewHandler);










const togglePopupFullview = function (elementCard) {
  const popupFullview = document.querySelector('.popup-photo');
  const elementFullview = elementCard.querySelector('.element__picture');
  const elementName = elementCard.querySelector('.element__name');
  const elementLink = elementCard.querySelector('.element__picture').src;
  elementFullview.addEventListener("click", () => {
    const popupPhotoName = popupFullview.querySelector('.popup-photo__name');
    const popupPhotoLink = popupFullview.querySelector('.popup-photo__fullview');
    popupPhotoName.textContent = elementName.textContent;
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
  // togglePopupFullview(elementCard);
  elementList.append(elementCard);
});





const cardPopup = document.querySelector('.popup-add');
const imagePopup = document.querySelector('.popup-photo');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditName = profilePopup.querySelector('.popup__edit_name_copy');


const popupOpen = function (evt) {
  if ((evt.target.classList.value === 'profile__edit-button') && (!evt.target.classList.contains('popup-visual'))) {
    profilePopup.classList.remove('popup-add');
    profilePopup.classList.add('popup-edit');
    profilePopup.classList.add('popup-visual');
    popupEditName.value = profileInfoName.textContent;
    popupEditActivity.value = profileInfoActivity.textContent;
   }

   else if ((evt.target.classList.value === 'profile__add-button') && (!evt.target.classList.contains('popup-visual'))) {
    cardPopup.classList.remove('popup-edit');
    cardPopup.classList.add('popup-add');
    cardPopup.classList.add('popup-visual');
 }
}

const popupClose = function () {
  profilePopup.classList.remove('popup-visual');
  cardPopup.classList.remove('popup-visual');
}


const closeButton = document.querySelectorAll('.popup__btn-close');
[...closeButton].forEach((closeButton) =>
   closeButton.addEventListener('click', popupClose));

addButton.addEventListener('click', popupOpen);
editButton.addEventListener('click', popupOpen);






