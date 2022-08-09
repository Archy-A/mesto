const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const saveButton = popup.querySelector('.popup__save-info');
const closeEditButton = popup.querySelector('.popup__close');
const profileInfoName = document.querySelector('.profile__name');
const profileInfoActivity = document.querySelector('.profile__activity');
const popupEditName = popup.querySelector('.popup__edit-name');
const popupEditActivity = popup.querySelector('.popup__edit-activity');


const togglePopup = function () {
  popup.classList.toggle('popup_opened');
  popupEditName.value = profileInfoName.textContent;
  popupEditActivity.value = profileInfoActivity.textContent;
}

editButton.addEventListener('click', togglePopup);
closeEditButton.addEventListener('click', togglePopup);

console.log(profileInfoName.textContent);
console.log(profileInfoActivity.textContent);

console.log(popupEditName.textContent);
console.log(popupEditActivity.textContent);

const savePopup = function (evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_opened');
  profileInfoName.textContent = popupEditName.value;
  profileInfoActivity.textContent = popupEditActivity.value;
}

saveButton.addEventListener('click', savePopup);
