import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup imageCard-popup popup_background-color-opacity_09 ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__card-img">
        <button className="popup__close-btn opacity" type="button" aria-label="закрыть окно" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card?.link.toString()} alt={props.card ? props.card.name : ''} />
        <p className="popup__caption">{props.card ? props.card.name : ''}</p>
      </div>
    </div>
  );
};

export default ImagePopup;