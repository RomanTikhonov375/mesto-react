import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { CurrentUserContext } from '../../src/context/CurrentUserContext';

export default function EditProfilePopup(props) {
    const isDirty = true; // Костыль , для сдачи работы, после проверки переделаю все формы с помощью react-hook-form
    const isValid = true; // Костыль , для сдачи работы, после проверки переделаю все формы с помощью react-hook-form
    const currentUser = useContext(CurrentUserContext);
    const [userName, setUserName] = useState('');
    const [userCareer, setUserCareer] = useState('');

    useEffect(() => {
        setUserName(currentUser.name);
        setUserCareer(currentUser.about);
    }, [currentUser]);


    function handleSubmit(e) {
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name: userName,
            about: userCareer
        }

        );
    }
    return (
        <PopupWithForm
            buttonText={!props.isLoading ? 'Сохранить' : 'Сохранение...'}
            isDirty={isDirty}
            isValid={isValid}
            onSubmit={handleSubmit}
            title="Редактировать профиль"
            name="edit-profile"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <input type="text" className="popup__input popup__input_type_name" id="user-name" name="name"
                placeholder="Введите ваше имя" required maxLength="40" minLength="2" value={userName || ''} onChange={e => setUserName(e.target.value)} />
            <span id="user-name-error" className="popup__input-error"></span>
            <input type="text" className="popup__input popup__input_type_career" id="user-career" name="about"
                placeholder="Введите ваше призвание" required minLength="2" maxLength="200" value={userCareer || ''} onChange={e => setUserCareer(e.target.value)} />
            <span id="user-career-error" className="popup__input-error"></span>
        </PopupWithForm>
    )
}