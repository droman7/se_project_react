import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const userInitial = currentUser?.name?.charAt(0).toUpperCase();

  return (
    <div className="sidebar">
      <div className="sidebar__top-row">
        {currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={`${currentUser.name}'s avatar`}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{userInitial}</div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>

      <button className="sidebar__edit-button" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__logout-button" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
