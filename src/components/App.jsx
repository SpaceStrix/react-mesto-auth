import React, { useEffect, useState, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

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

import * as auth from "../utils/Auth";
import { Login } from "./Login";
import { Register } from "./Register";
import { ProtectedRoute } from "./ProtectedRoute";

import { api } from "../utils/api";

export const App = () => {
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
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      });
  };
  const handleUpdateAvatar = newUrl => {
    api
      .setNewAvatar(newUrl)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      });
  };
  const handleAddPlaceSubmit = newCard => {
    api
      .addNewCardToServer(newCard)
      .then(data => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const onAuth = useCallback(data => {
    localStorage.setItem("jwt", data.token);
    setLoggedIn(true);
    setUserData(data.user);
    navigate("/");
  }, []);
  const onTokenCheck = useCallback(async () => {
    try {
      setLoading(true);

      const jwt = localStorage.getItem("jwt");
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
  const onLogin = useCallback(async ({ password, email }) => {
    try {
      setLoading(true);
      const data = await auth.login({ password, email });
      if (!data) {
        throw new Error("???????????????? ???????????? ?????? ??????????");
      }
      if (data.token) {
        onAuth(data);
      }
      setUserData(email);
      return data;
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);
  const onRegistration = useCallback(
    async ({ password, email }) => {
      try {
        setLoading(true);
        const data = await auth.register({ password, email });
        setNotificationPopup(true);
        setNotificationAnswer(true);
        setTimeout(() => {
          onLogin({ password, email });
        }, 300);

        onAuth(data);
        return data;
      } catch {
        setNotificationPopup(true);
        setNotificationAnswer(false);
      } finally {
        setLoading(false);
      }
    },
    [onAuth]
  );
  const onLogOut = () => {
    localStorage.removeItem("jwt");
    setUserData("");
    navigate("sign-in");
    setLoggedIn(false);
  };

  useEffect(() => {
    onTokenCheck();
  }, [onTokenCheck]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header onLogout={onLogOut} email={userData} />
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
              element={<Login onLogin={onLogin} loggedIn={loggedIn} />}
            />
            <Route
              path="sign-up"
              element={<Register onReg={onRegistration} loggedIn={loggedIn} />}
            />
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
