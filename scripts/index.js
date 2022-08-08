
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = popup.querySelector('.popup__close');
const profileInfoName = document.querySelector('.profile__info_name');
const profileInfoActivity = document.querySelector('.profile__info_activity');

const popupEditName = popup.querySelector('.popup__edit-name');
const popupEditActivity = popup.querySelector('.popup__edit-activity');


console.log(profileInfoName.textContent);
console.log(popupEditName.textContent);


const togglePopup = function () {
  popup.classList.toggle('popup_opened');

  popupEditName.value = profileInfoName.textContent;
  popupEditActivity.value = profileInfoActivity.textContent;

}

editButton.addEventListener('click', togglePopup)
closeEditButton.addEventListener('click', togglePopup)


// profileInfoName.innerHTML = `
// <div class="profile__info_group">
//   <p class="profile__info_name">${profileInfoName.textContent}</p>
// </div>
// `;
