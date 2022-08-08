const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const saveButton = popup.querySelector('.popup__save-info');
const closeEditButton = popup.querySelector('.popup__close');
const profileInfoName = document.querySelector('.profile__info_name');
const profileInfoActivity = document.querySelector('.profile__info_activity');
const popupEditName = popup.querySelector('.popup__edit-name');
const popupEditActivity = popup.querySelector('.popup__edit-activity');


const togglePopup = function () {
  popup.classList.toggle('popup_opened');
  popupEditName.value = profileInfoName.textContent;
  popupEditActivity.value = profileInfoActivity.textContent;
}

editButton.addEventListener('click', togglePopup);
closeEditButton.addEventListener('click', togglePopup);

const savePopup = function () {
  popup.classList.toggle('popup_opened');
  profileInfoName.textContent = popupEditName.value;
  profileInfoActivity.textContent = popupEditActivity.value;
}

saveButton.addEventListener('click', savePopup);
