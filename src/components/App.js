import React, { useEffect, useState, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Header } from "./Heades";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import * as Auth from "./Auth";
import { ProtectedRoute } from "./ProtectedRoute";
//
//
import { Login } from "./Login";
import Register from "./Register";

//

import api from "../utils/api";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //
  //
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate(); //

  useEffect(() => {
    api
      .getInitialData()
      .then(([getDataCard, getDataUserInfo]) => {
        setCurrentUser(getDataUserInfo);
        setCards(getDataCard);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  //
  //

  // =========================================
  // callback open
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = link => {
    setSelectedCard(link);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };
  const handleCardLike = card => {
    const isLiked = card.likes.some(
      whoLiked => whoLiked._id === currentUser._id
    );
    api
      .toggleLike(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => {
        console.error(err);
      });
  };
  const handleCardDelete = card => {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(err => {
        console.error(err);
      });
  };
  const handleUpdateUser = newData => {
    api
      .setNewUserInfo(newData)
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  };
  const handleUpdateAvatar = newUrl => {
    api
      .setNewAvatar(newUrl)
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  };
  const handleAddPlaceSubmit = newCard => {
    api
      .addNewCardToServer(newCard)
      .then(data => {
        setCards([data, ...cards]);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  };

  const tokenCheck = useCallback(async () => {
    try {
      setLoading(true);

      let jwt = localStorage.getItem("jwt");
      if (!jwt) {
        throw new Error("no token");
      }

      const user = await Auth.checkToken(jwt);
      if (!user) {
        throw new Error("invalid user");
      }

      if (user) {
        setLoggedIn(true);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  const cBackLogin = useCallback(async ({ password, email }) => {
    try {
      setLoading(true);
      const data = await Auth.login(password, email);

      if (!data) {
        throw new Error("Неверный пароль или почта");
      }
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        setLoggedIn(true);
        setUserData(data.email);
        navigate("/");
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  // if (loading) {
  //   return "... loading";
  // }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<Login onLogin={cBackLogin} />} />
          <Route path="/sign-up" element={<Register />} />
        </Routes>
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          name={"image"}
        />
      </>
    </CurrentUserContext.Provider>
  );
};

export default App;
