import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/logo.svg";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onLoginClick,
  onRegisterClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  const userInitial = currentUser?.name?.charAt(0).toUpperCase();

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="WTWR Logo" src={logo} />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__button-container">
        <ToggleSwitch />
        {currentUser && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
        )}

        {!currentUser ? (
          <>
            <button onClick={onLoginClick} className="header__auth-btn">
              Login
            </button>
            <button onClick={onRegisterClick} className="header__auth-btn">
              Sign Up
            </button>
          </>
        ) : (
          <>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser.name}</p>
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {userInitial}
                  </div>
                )}
              </div>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
