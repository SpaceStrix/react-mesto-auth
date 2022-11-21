import React, { useEffect, useState, useCallback } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import { Header } from "./Heades";
import { Loading } from "./Loading";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { PageNotFound } from "./PageNotFound";
import { InfoTooltip } from "./InfoTooltip";

import { ImagePopup } from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";

import * as auth from "./Auth";
import { Login } from "./Login";
import { Register } from "./Register";

//

import { api } from "../utils/api";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [notificationPopup, setNotificationPopup] = useState(false);
  const [notificationAnswer, setNotificationAnswer] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); //

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialData()
        .then(([getDataCard, getDataUserInfo]) => {
          setCurrentUser(getDataUserInfo);
          setCards(getDataCard);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [loggedIn]);

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
    setNotificationPopup(false);
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

  const cBackAuth = useCallback(data => {
    localStorage.setItem("jwt", data.token);
    setLoggedIn(true);
    setUserData(data.user);
    navigate("/");
  }, []);

  const tokenCheck = useCallback(async () => {
    try {
      setLoading(true);

      let jwt = localStorage.getItem("jwt");
      if (!jwt) {
        throw new Error("no token");
      }

      const user = await auth.checkToken(jwt);
      if (!user) {
        throw new Error("invalid user");
      }

      if (user) {
        setUserData(user.data.email);
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
      const data = await auth.login({ password, email });
      if (!data) {
        throw new Error("Неверный пароль или почта");
      }
      if (data.token) {
        cBackAuth(data);
      }
      setUserData(email);
      return data;
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  const cBackReg = useCallback(
    async ({ password, email }) => {
      try {
        setLoading(true);
        const data = await auth.register({ password, email });
        setNotificationPopup(true);
        setNotificationAnswer(true);
        setTimeout(() => {
          cBackLogin({ password, email });
        }, 300);

        cBackAuth(data);
        return data;
      } catch {
        setNotificationPopup(true);
        setNotificationAnswer(false);
      } finally {
        setLoading(false);
      }
    },
    [cBackAuth]
  );

  const cBackLogOut = () => {
    localStorage.removeItem("jwt");
    setUserData("");
    navigate("sign-in");
    setLoggedIn(false);
  };

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header onLogout={cBackLogOut} email={userData} />
        {loading ? (
          <Loading />
        ) : (
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
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="sign-in"
              element={<Login onLogin={cBackLogin} loggedIn={loggedIn} />}
            />
            <Route
              path="sign-up"
              element={<Register onReg={cBackReg} loggedIn={loggedIn} />}
            />
            <Route path="404" element={<Navigate to="/404" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}

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
        <InfoTooltip
          isOpen={notificationPopup}
          onClose={closeAllPopups}
          status={notificationAnswer}
        />
      </>
    </CurrentUserContext.Provider>
  );
};

export default App;