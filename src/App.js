
import './index.css';
import React from 'react';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();

  return (
    <>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        closeAllModals={closeAllModals}
        selectedCard={selectedCard}
        onCardClick={handleCardClick}

      />
      <Footer />
</>
  );

  function handleCardClick (selectedCard) {
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

  function closeAllModals() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard('');
  
  }
}



export default App;
