class UserInfo {
  constructor(profileInfoName, profileInfoActivity, profileInfoAvatar) {
    this.profileInfoName = document.querySelector(profileInfoName);
    this.profileInfoActivity = document.querySelector(profileInfoActivity);
    this.profileAva = document.querySelector(profileInfoAvatar);
  }

  getUserInfo() {
    const UserData = {
      name: this.profileInfoName.textContent,
      info: this.profileInfoActivity.textContent
    };
    return UserData;
  }

  setUserInfo(nameAndInfo) {
    this.profileInfoName.textContent = nameAndInfo.name;
    this.profileInfoActivity.textContent = nameAndInfo.about;
    if (nameAndInfo.avatar) {
      this.profileAva.src = nameAndInfo.avatar;
    }
  }
}

export { UserInfo as UserInfo };
