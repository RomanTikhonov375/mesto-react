import React from "react";

function PopupWithForm(props) {
    return (

        <div className={`popup  popup_background-color-opacity_05 ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-btn opacity" type="button" aria-label="закрыть окно" onClick={props.onClose}></button>
                <h2 className="popup__heading">{props.title}</h2>
                <form action="#" className='popup__form popup__form' name={props.name} noValidate onSubmit={props.onSubmit}>
                    {props.children};
                    <button disabled={!props?.isDirty || !props?.isValid} type="submit" className={`popup__submit-btn ${!props.isDirty || !props.isValid ? 'popup__submit-btn_inactive' : ''}`}>{props.buttonText || 'Сохранить'}</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;