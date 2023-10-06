
import '../../src/index.css';
import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import { useEffect, useState } from 'react';
import api from "../utils/Api.js";
import { CurrentUserContext } from '../../src/context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import DeleteConfirmationPopup from './DeleteConfirmationPopup.jsx';


function App() {

  const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [cardDelete, setCardDelete] = useState(null);

  useEffect(() => {
    api.getInitialCards()
      .then(res =>
        setCards(res))
      .catch(console.error);
  }, []);

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(console.error);
  }, [])

  function handleAddPlaceSubmit({ name, link }) {

    api.setUserCard({ name, link })
      .then(res => {
        setIsLoading(true)
        setCards([res, ...cards]);
        closeAllModals();
      })
      .finally(
        setIsLoading(false)
      )
      .catch(console.error)

  }

  function handleCardLike(card, setCards) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error);
  }

  function handleCardDelete(card, setCards) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => { return c._id !== card._id }))

      })
      .catch(console.error);
  }

  function handleUpdateAvatar(url) {
    setIsLoading(true)
    api.setAvatar(url)
      .then(res => {
        setCurrentUser(res);
        closeAllModals();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
      }
      )
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true)
    api.editingProfile({ name, about })
      .then(res => {
        setCurrentUser(res);
        closeAllModals();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
      })
  }


  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function showDeletePopup(card) {
    setCardDelete(card);
    setIsDeleteConfirmationPopupOpen(true);
  }

  function closeAllModals() {
    setIsDeleteConfirmationPopupOpen(false)
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);

  }
  return (
    <CurrentUserContext.Provider value={currentUser} >
      <Header />
      <Main
        setCards={setCards}
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onTrashClick={showDeletePopup}

      />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllModals} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllModals} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}></EditAvatarPopup>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllModals} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}></AddPlacePopup>
      <DeleteConfirmationPopup isOpen={isDeleteConfirmationPopupOpen} onClose={closeAllModals} onCardDelete={handleCardDelete} card={cardDelete} setCards={setCards}></DeleteConfirmationPopup>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllModals}
      />
      <Footer />

    </CurrentUserContext.Provider>

  );
}

export default App;