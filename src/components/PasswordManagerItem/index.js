// Write your code here
import './index.css'

const START_IMG_URL =
  'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

const PasswordManagerItem = props => {
  const {passwordManagerDetails, onDeleteUser, selectBoxActive} = props
  const {websiteName, id, userName, password} = passwordManagerDetails

  const initialName = websiteName.slice(0, 1)

  const onDelete = () => {
    onDeleteUser(id)
  }

  return (
    <li className="list-item">
      <div className="initial-name-container">
        <p className="initial-name">{initialName}</p>
      </div>
      <div className="user-details-container">
        <p className="user-detail">{websiteName}</p>
        <p className="user-detail"> {userName}</p>

        {selectBoxActive ? (
          <p className="user-detail">{password}</p>
        ) : (
          <img className="star-img" src={START_IMG_URL} alt="stars" />
        )}
      </div>
      <div>
        <button className="btn" onClick={onDelete} type="button">
          <img
            className="delete-img"
            alt="delete"
            testid="delete"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordManagerItem
