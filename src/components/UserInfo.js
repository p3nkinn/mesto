export default class UserInfo {
  constructor({profileNameSelector, profileJobSelector, profileImage}) {
    this._profileNameSelector = document.querySelector(profileNameSelector)
    this._profileJobSelector = document.querySelector(profileJobSelector)
    this._profileImage = document.querySelector(profileImage)
  }

  getUserInfo() {
    return {
      profileName: this._profileNameSelector.textContent,
      profileAboutName: this._profileJobSelector.textContent,
      profileImage: this._profileImage.src
    }
  }

  setUserInfo(userData) {
    if (userData.profileName, userData.profileAboutName, userData.profileImage) {
      this._profileNameSelector.textContent = userData.profileName,
      this._profileJobSelector.textContent = userData.profileAboutName
      this._profileImage.src = userData.profileImage
    } else {
      console.log('Ошибка данных');
    }
  }

  setAvatar(userData) {
    this._profileImage.src = userData.profileImage
  }
}
