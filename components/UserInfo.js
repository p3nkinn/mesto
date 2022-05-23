export default class UserInfo {
  constructor({profileNameSelector, profileJobSelector}) {
    this._profileNameSelector = document.querySelector(profileNameSelector)
    this._profileJobSelector = document.querySelector(profileJobSelector)
  }

  getUserInfo() {
    return {
      profileName: this._profileNameSelector.textContent,
      jobName: this._profileJobSelector.textContent
    }
  }

  setUserInfo(userData) {
    this._profileNameSelector.textContent = userData.profileName,
    this._profileJobSelector.textContent = userData.jobName
  }
}
