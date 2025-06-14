import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const userInitial = currentUser?.name?.charAt(0).toUpperCase();

  return (
    <div className="sidebar">
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
      <button className="sidebar__edit-button" onClick={onEditProfile}>
        Edit Profile
      </button>
    </div>
  );
}

export default SideBar;
