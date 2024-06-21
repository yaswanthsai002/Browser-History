import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPasswords: false,
      passwords: [],
      website: '',
      username: '',
      password: '',
      searchValue: '',
      passwordsCount: 0,
    }
  }

  handleWebsiteChange = event => this.setState({website: event.target.value})

  handleUsernameChange = event => this.setState({username: event.target.value})

  handlePasswordChange = event => this.setState({password: event.target.value})

  handleSearchValueChange = event =>
    this.setState({searchValue: event.target.value})

  handleShowPasswords = () =>
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))

  deletePassword = id => {
    const {passwords} = this.state
    const updatedPasswords = passwords.filter(password => password.id !== id)
    this.setState(prevState => ({
      passwords: updatedPasswords,
      passwordsCount: prevState.passwordsCount - 1,
    }))
  }

  addPassword = event => {
    event.preventDefault()
    const {website, username, password, passwords} = this.state
    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      passwords: [...passwords, newPassword],
      passwordsCount: prevState.passwordsCount + 1,
      website: '',
      username: '',
      password: '',
    }))
  }

  render() {
    const {
      website,
      username,
      password,
      passwords,
      passwordsCount,
      searchValue,
      showPasswords,
    } = this.state

    const filteredPasswords = passwords.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchValue.toLowerCase()),
    )

    return (
      <div className="main-container">
        <div className="logo-container">
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>
        <div className="flex-form-container">
          <div className="form-container">
            <form onSubmit={this.addPassword}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="form-grp">
                <label className="website-label" htmlFor="website">
                  <img
                    className="website-logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                </label>
                <input
                  name="website"
                  id="website"
                  value={website}
                  type="text"
                  className="website-input"
                  placeholder="Enter Website"
                  onChange={this.handleWebsiteChange}
                />
              </div>
              <div className="form-grp">
                <label className="username-label" htmlFor="username">
                  <img
                    className="username-logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                </label>
                <input
                  name="username"
                  id="username"
                  type="text"
                  className="username-input"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.handleUsernameChange}
                />
              </div>
              <div className="form-grp">
                <label className="password-label" htmlFor="password">
                  <img
                    className="password-logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                </label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  className="password-input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.handlePasswordChange}
                />
              </div>
              <button type="submit" className="submit-btn">
                Add
              </button>
            </form>
          </div>
          <div className="form-image-container">
            <img
              id="sm-img"
              className="password-manager-sm-logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
            <img
              id="lg-img"
              className="password-manager-lg-logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <div className="passwords-container">
          <div className="passwords-container-header">
            <h1 className="passwords-count-heading">
              Your Passwords <p className="passwords-count">{passwordsCount}</p>
            </h1>
            <div className="form-grp">
              <label className="search-label" htmlFor="search-input">
                <img
                  className="search-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </label>
              <input
                name="search input"
                id="search-input"
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.handleSearchValueChange}
              />
            </div>
          </div>
          <hr />
          <div className="show-passwords-container">
            <div className="form-group">
              <input
                type="checkbox"
                onClick={this.handleShowPasswords}
                name="show passwords checkbox"
                id="show-passwords-checkbox"
              />
              <label
                htmlFor="show-passwords-checkbox"
                className="show-passwords-label"
              >
                Show Passwords
              </label>
            </div>
          </div>
          <div className="passwords-grid-container">
            {filteredPasswords.length > 0 ? (
              <ul className="passwords-list">
                {filteredPasswords.map(item => (
                  <li className="passwords-item" key={item.id}>
                    <div className="profile-photo">
                      {item.website[0].toUpperCase()}
                    </div>
                    <div className="details-container">
                      <p className="website-text">{item.website}</p>
                      <p className="username-text">{item.username}</p>
                      {showPasswords ? (
                        <p className="password-text">{item.password}</p>
                      ) : (
                        <img
                          className="stars-logo"
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                        />
                      )}
                    </div>
                    <div className="del-btn-container">
                      <button
                        type="button"
                        className="del-btn"
                        onClick={() => this.deletePassword(item.id)}
                        data-testid="delete"
                      >
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                          className="del-logo"
                          alt="delete"
                        />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-passwords-container">
                <img
                  className="no-passwords-logo"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p className="no-passwords-heading">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
