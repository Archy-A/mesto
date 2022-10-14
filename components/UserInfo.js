class UserInfo {
  constructor(profileInfoName, profileInfoActivity) {
    this.profileInfoName = profileInfoName;
    this.profileInfoActivity = profileInfoActivity;
  }

  getUserInfo() {
    let UserData = {
      name: this.profileInfoName.textContent,
      info: this.profileInfoActivity.textContent
    };
    return UserData;
  }

  setUserInfo(nameAndInfo) {
    const profileInfoName = document.querySelector('.profile__name');
    const profileInfoActivity = document.querySelector('.profile__activity');
    profileInfoName.textContent = nameAndInfo.profileName;
    profileInfoActivity.textContent = nameAndInfo.profileActivity;
  }
}

export { UserInfo as UserInfo };
