import {Component} from 'react'
import {v4} from 'uuid'

import PasswordManagerItem from '../PasswordManagerItem'
import './index.css'

class PasswordManagers extends Component {
  state = {
    passwordManagerList: [],
    inputWebsite: '',
    inputUsername: '',
    inputPassword: '',
    searchInput: '',
    countPassword: 0,
    isCheckboxSelected: false,
  }

  onChangeWebsiteInput = event => {
    const {inputWebsite} = this.state
    this.setState({
      inputWebsite: event.target.value,
    })
    console.log(inputWebsite)
  }

  onChangeUsernameInput = event => {
    const {inputUsername} = this.state
    this.setState({
      inputUsername: event.target.value,
    })
    console.log(inputUsername)
  }

  onChangePasswordInput = event => {
    const {inputPassword} = this.state
    this.setState({
      inputPassword: event.target.value,
    })
    console.log(inputPassword)
  }

  onAddNewCredentials = event => {
    event.preventDefault()
    const {inputWebsite, inputUsername, inputPassword} = this.state

    const addNewCredentials = {
      id: v4(),
      websiteName: inputWebsite,
      userName: inputUsername,
      password: inputPassword,
      isCheckboxSelected: false,
    }
    this.setState(preState => ({
      passwordManagerList: [...preState.passwordManagerList, addNewCredentials],
      inputWebsite: '',
      inputUsername: '',
      inputPassword: '',
    }))
  }

  noPasswordImgDisplay = () => (
    <div className="no-password-img-container">
      <img
        alt="no passwords"
        className="no-password-img"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
      />
      <p>No Passwords</p>
    </div>
  )

  onChangeSearchInput = event => {
    const {searchInput} = this.state

    this.setState({
      searchInput: event.target.value,
    })
    console.log(searchInput)
  }

  onChangeSelectedBox = () => {
    this.setState(preState => ({
      isCheckboxSelected: !preState.isCheckboxSelected,
    }))
  }

  onDeleteUser = userId => {
    const {passwordManagerList} = this.state
    this.setState({
      passwordManagerList: passwordManagerList.filter(
        eachDetail => eachDetail.id !== userId,
      ),
    })
  }

  render() {
    const {
      inputWebsite,
      inputUsername,
      inputPassword,
      searchInput,
      isCheckboxSelected,
      passwordManagerList,
    } = this.state

    const searchResults = passwordManagerList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <div className="password-manager-container">
          <img
            className="logo-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
          <div className="password-manager-section">
            <form className="details-form" onSubmit={this.onAddNewCredentials}>
              <h1 className="add-new-details-header">Add New Password</h1>
              <div className="credentials-container">
                <div className="credentials-icon-container">
                  <img
                    alt="website"
                    className="credentials-icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  />
                </div>
                <input
                  value={inputWebsite}
                  onChange={this.onChangeWebsiteInput}
                  className="input"
                  placeholder="Enter Website name"
                  type="text"
                />
              </div>

              <div className="credentials-container">
                <div className="credentials-icon-container">
                  <img
                    alt="username"
                    className="credentials-icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  />
                </div>
                <input
                  value={inputUsername}
                  onChange={this.onChangeUsernameInput}
                  className="input"
                  placeholder="Enter Username"
                  type="text"
                />
              </div>

              <div className="credentials-container">
                <div className="credentials-icon-container">
                  <img
                    alt="password"
                    className="credentials-icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  />
                </div>
                <input
                  value={inputPassword}
                  onChange={this.onChangePasswordInput}
                  className="input"
                  placeholder="Enter Password"
                  type="password"
                />
              </div>

              <div className="btn-container">
                <button
                  className="add-button"
                  onClick={this.onAddNewCredentials}
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
            <img
              className="password-manager-sm-image"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            />
            <img
              className="password-manger-lg-image"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            />
          </div>
          <div className="password-manager-details">
            <div className="password-search-container">
              <h1 className="password-count-heading">
                Your Passwords
                <span className="password-count">{searchResults.length}</span>
              </h1>
              <div className="search-container">
                <div className="search-icon-container">
                  <img
                    alt="search"
                    className="search-icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  />
                </div>
                <input
                  onChange={this.onChangeSearchInput}
                  className="search-input"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
            <hr className="line" />
            <div className="checkbox-container">
              <input
                value={isCheckboxSelected}
                type="checkbox"
                onChange={this.onChangeSelectedBox}
                className="checkbox-input"
              />
              <label htmlFor="checkbox">Show passwords</label>
            </div>
            {searchResults.length === 0 ? this.noPasswordImgDisplay() : ''}

            <ul className="list-container">
              {searchResults.map(eachPasswordItem => (
                <PasswordManagerItem
                  key={eachPasswordItem.id}
                  selectBoxActive={isCheckboxSelected}
                  onDeleteUser={this.onDeleteUser}
                  passwordManagerDetails={eachPasswordItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManagers
