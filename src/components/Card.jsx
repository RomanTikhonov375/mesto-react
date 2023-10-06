import React from "react";
import { CurrentUserContext } from '../../src/context/CurrentUserContext';
import { useContext } from 'react';

function Card(props) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.ownerId === currentUser._id;
    const isLiked = props.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like-button ${isLiked && 'card__like-button_active'}`
    );

    function handleTrashClick() {
        props.onTrashClick(props);
        
    }

    function handleClick() {
          props.onCardClick(props);
    }

    function handleLike() {
        props.handleLikeClick(props, props.setCards)
    }



    return (
        <li className="card" >
            {isOwn && <button className="card__trash card__trash_active opacity" type="button" aria-label="удалить карточку" onClick={handleTrashClick}/>}
            <img src={props.link} alt={props.name} className="card__image"  onClick={handleClick}/>
            <div className="card__info">
                <h2 className="card__name">{props.name}</h2>
                <div className="card__like-wrapper">
                    <button className={cardLikeButtonClassName} type="button" aria-label="мне нравится" onClick={handleLike}></button>
                    <span className="card__like-counter">{props.likes.length}</span>
                </div>
            </div>
        </li>
    )

}

export default Card;