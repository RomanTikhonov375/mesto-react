import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import api from "../utils/Api.jsx";
import Card from "./Card.jsx";

function Main(props) {

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then(res =>
        setCards(res))
  }, []);

  return (
    <main className="main-page">
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} ></div>
          <div className="profile__iconAvatar-wrapper" onClick={props.onEditAvatar}>
            <div className="profile__iconAvatar"  ></div>
          </div>

        </div>


        <div className="profile__info">
          <div className="profile__user-name-wrapper">
            <h1 className="profile__user-name">{userName}</h1>
            <button className="profile__edit-button opacity" type="button"
              aria-label="редактировать профиль" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__career">{userDescription}</p>
        </div>

        <button className="profile__add-button opacity" type="button" aria-label="добавить карточку" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards" aria-label="Фото галерея">

        <ul className="cards-list">
          {cards.map(card => {
            return (
              < Card
                key={card._id}
                link={card.link}
                name={card.name}
                likes={card.likes}
                onCardClick={props.onCardClick}
              />

            )
          }
          )}
        </ul>
      </section>
      <PopupWithForm
        title="Редактировать профиль"
        name="edit-profile"
        buttonText="Сохранить"
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.closeAllModals}
        children={
          <>
            <input type="text" className="popup__input popup__input_type_name" id="user-name" name="name"
              placeholder="Введите ваше имя" required maxLength="40" minLength="2" />
            <span id="user-name-error" className="popup__input-error"></span>
            <input type="text" className="popup__input popup__input_type_career" id="user-career" name="about"
              placeholder="Введите ваше призвание" required minLength="2" maxLength="200" />
            <span id="user-career-error" className="popup__input-error"></span>
          </>
        }
      />

      <PopupWithForm
        title="Новое место"
        name="edit-card"
        buttonText="Создать"
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.closeAllModals}
        children={
          <>
            <input type="text" className="popup__input popup__input_type_place" id="card-place" name="name"
              placeholder="Название" required minLength="2" maxLength="30" />
            <span id="card-place-error" className="popup__input-error"></span>
            <input type="url" className="popup__input popup__input_type_link" id="card-link" name="link"
              placeholder="Ссылка на картинку" required />
            <span id="card-link-error" className="popup__input-error"></span>
          </>
        } />
      <PopupWithForm
        title="Вы уверены?"
        name="delete-popup"
        buttonText="Вы уверены?"
      />
      <PopupWithForm
        title="Обновить аватар"
        name="edit-avatar"
        buttonText="Сохранить"
        isOpen={props.isEditAvatarPopupOpen}
        onClose={props.closeAllModals}
        children={
          <><input type="url" className="popup__input popup__input_type_link" id="card-avatar-link" name="link"
            placeholder="Ссылка на картинку" required />
            <span id="card-avatar-link-error" className="popup__input-error"></span>
          </>
        } />
      <ImagePopup
        card={props.selectedCard}
        onClose={props.closeAllModals}
      />
    </main>
  );

};

export default Main;