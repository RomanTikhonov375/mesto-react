import React from "react";

function Card(props) {

    function handleClick() {
        props.onCardClick(props);
    }

    return (
        <li className="card" onClick={handleClick}>
            <button className="card__trash opacity" type="button" aria-label="удалить карточку"></button>
            <img src={props.link} alt="#" className="card__image" />
            <div className="card__info">
                <h2 className="card__name">{props.name}</h2>
                <div className="card__like-wrapper">
                    <button className="card__like-button" type="button" aria-label="мне нравится"></button>
                    <span className="card__like-counter">{props.likes.length}</span>
                </div>
            </div>
        </li>
    )

}

export default Card;