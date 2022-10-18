class UserInfo {
  constructor(profileInfoName, profileInfoActivity) {
    this.profileInfoName = document.querySelector(profileInfoName);
    this.profileInfoActivity = document.querySelector(profileInfoActivity);
    this.profileInfoName = document.querySelector('.profile__name');
    this.profileInfoActivity = document.querySelector('.profile__activity');
  }

  getUserInfo() {
    const UserData = {
      name: this.profileInfoName.textContent,
      info: this.profileInfoActivity.textContent
    };
    return UserData;
  }

  setUserInfo(nameAndInfo) {
    this.profileInfoName.textContent = nameAndInfo.profileName;
    this.profileInfoActivity.textContent = nameAndInfo.profileActivity;
  }
}

export { UserInfo as UserInfo };
