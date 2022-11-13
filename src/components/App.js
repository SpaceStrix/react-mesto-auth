import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Header } from "./Heades";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

//
//
import { ProtectedRoute } from "./ProtectedRoute"; //hoc components
import Login from "./Login";
import Register from "./Register";

//
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

  //
  //
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
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header />
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>

          <Route path="/main">
            <Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Route>

          <Route path="/sign-up">
            <Register />
          </Route>

          <Route path="/sign-in">
            <Login />
          </Route>

          <Footer />
        </Switch>
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
