class UserInfo {
  constructor(profileInfoName, profileInfoActivity) {
    this.profileInfoName = document.querySelector(profileInfoName);
    this.profileInfoActivity = document.querySelector(profileInfoActivity);
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
