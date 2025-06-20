import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import "../../vendor/fonts.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { getItems, deleteItem, addItem } from "../../utils/api";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";

function App() {
  // Weather & clothing states
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);

  // UI states
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Authentication states
  const [currentUser, setCurrentUser] = useState(null);
  const [jwt, setJwt] = useState(localStorage.getItem("jwt") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwt"));
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Handle temperature unit toggle
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Modal open/close handlers
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  // CRUD for clothing items
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather }, jwt)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem.data, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to add item:", err);
      });
  };

  const handleCardDelete = () => {
    deleteItem(selectedCard._id, jwt)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Delete item failed:", err);
      });
  };
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const request = !isLiked ? api.likeItem : api.unlikeItem;

    request(id, token)
      .then((res) => {
        const updatedCard = res.data;
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log("Like/Unlike failed:", err));
  };

  const handleUpdateUser = ({ name, avatar }) => {
    auth
      .editUser({ name, avatar }, jwt)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
      });
  };

  useEffect(() => {
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setJwt("");
          setCurrentUser(null);
          setIsLoggedIn(false);
        });
    }
  }, [jwt]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error("Failed to fetch weather data:", err);
      });
  }, []);

  useEffect(() => {
    getItems(jwt)
      .then(({ data }) => {
        const sortedItems = data.sort((a, b) => (b._id > a._id ? 1 : -1));
        setClothingItems(sortedItems);
      })
      .catch((err) => {
        console.error("Failed to fetch clothing items:", err);
      });
  }, [jwt]);

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .register({ name, avatar, email, password })
      .then(() => {
        setIsRegisterOpen(false);
        return auth.login({ email, password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setJwt(data.token);
        setCurrentUser(data.user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Registration or login failed:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    auth
      .login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setJwt(data.token);
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        setIsLoginOpen(false);
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setJwt("");
    setCurrentUser(null);
  };

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                onLoginClick={() => setIsLoginOpen(true)}
                onRegisterClick={() => setIsRegisterOpen(true)}
                onLogout={handleLogout}
              />

              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                    />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute loggedIn={!!currentUser}>
                      <Profile
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        onAddClick={handleAddClick}
                        onUpdateUser={handleUpdateUser}
                        onCardLike={handleCardLike}
                        onLogout={handleLogout}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
            </div>

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />

            {activeModal === "preview" && (
              <ItemModal
                activeModal={activeModal}
                card={selectedCard}
                onClose={closeActiveModal}
                onCardDelete={handleCardDelete}
              />
            )}

            <LoginModal
              isOpen={isLoginOpen}
              onClose={() => setIsLoginOpen(false)}
              onLogin={handleLogin}
              switchToRegister={switchToRegister}
            />

            <RegisterModal
              isOpen={isRegisterOpen}
              onClose={() => setIsRegisterOpen(false)}
              onRegister={handleRegister}
              switchToLogin={switchToLogin}
            />

            <EditProfileModal
              isOpen={isEditProfileOpen}
              onClose={() => setIsEditProfileOpen(false)}
              onUpdateUser={handleUpdateUser}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
