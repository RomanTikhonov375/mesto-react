import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import api from "../utils/Api.js";
import Card from "./Card.jsx";
import {useEffect, useState} from 'react';

function Main(props) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(console.error);
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then(res =>
        setCards(res))
        .catch(console.error);
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

    </main>
  );

};

export default Main;