import React from "react";
import Card from "./Card.jsx";
import {useContext} from 'react';
import { CurrentUserContext } from '../../src/context/CurrentUserContext';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);



  return (
    <main className="main-page">
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} ></div>
          <div className="profile__iconAvatar-wrapper" onClick={props.onEditAvatar}>
            <div className="profile__iconAvatar"  ></div>
          </div>

        </div>


        <div className="profile__info">
          <div className="profile__user-name-wrapper">
            <h1 className="profile__user-name">{currentUser.name}</h1>
            <button className="profile__edit-button opacity" type="button"
              aria-label="редактировать профиль" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__career">{currentUser.about}</p>
        </div>

        <button className="profile__add-button opacity" type="button" aria-label="добавить карточку" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards" aria-label="Фото галерея">

        <ul className="cards-list">
          {props.cards.map(card => {
            
            return (
              < Card
                onTrashClick={props.onTrashClick}
                onCardDelete={props.onCardDelete}
                setCards={props.setCards}
                _id={card._id}
                handleLikeClick = {props.onCardLike}
                ownerId = {card.owner._id}
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