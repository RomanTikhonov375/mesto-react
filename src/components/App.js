
import '../../src/index.css';
import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);



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

  function closeAllModals() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);

  }
  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}

      />
      <PopupWithForm
        title="Редактировать профиль"
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllModals}
      >
        <input type="text" className="popup__input popup__input_type_name" id="user-name" name="name"
          placeholder="Введите ваше имя" required maxLength="40" minLength="2" />
        <span id="user-name-error" className="popup__input-error"></span>
        <input type="text" className="popup__input popup__input_type_career" id="user-career" name="about"
          placeholder="Введите ваше призвание" required minLength="2" maxLength="200" />
        <span id="user-career-error" className="popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        name="edit-card"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllModals}>
        <input type="text" className="popup__input popup__input_type_place" id="card-place" name="name"
          placeholder="Название" required minLength="2" maxLength="30" />
        <span id="card-place-error" className="popup__input-error"></span>
        <input type="url" className="popup__input popup__input_type_link" id="card-link" name="link"
          placeholder="Ссылка на картинку" required />
        <span id="card-link-error" className="popup__input-error"></span>
      </PopupWithForm>


      <PopupWithForm
        title="Вы уверены?"
        name="delete-popup"
        buttonText="Вы уверены?"
      />
      <PopupWithForm
        title="Обновить аватар"
        name="edit-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllModals}>
        <input type="url" className="popup__input popup__input_type_link" id="card-avatar-link" name="link"
          placeholder="Ссылка на картинку" required />
        <span id="card-avatar-link-error" className="popup__input-error"></span>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllModals}
      />
      <Footer />
    </>
  );
}

export default App;