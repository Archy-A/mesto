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
