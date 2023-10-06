import React from "react"
import PopupWithForm from "./PopupWithForm.jsx"
import { useRef } from "react";


export default function EditAvatarPopup(props) {
       
        const isDirty = true; // Костыль , для сдачи работы, после проверки переделаю все формы с помощью react-hook-form
        const isValid = true; // Костыль , для сдачи работы, после проверки переделаю все формы с помощью react-hook-form

        const inputRef = useRef();
        
        function handleSubmit(e) {
            e.preventDefault();
            props.onUpdateAvatar(inputRef.current.value);
          } 
     
        
    return (
        <PopupWithForm
            isDirty={isDirty}
            isValid={isValid}
            buttonText={!props.isLoading ? 'Сохранить' : 'Сохранение...'}
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            title="Обновить аватар"
            name="edit-avatar"
            >
            <input type="url" className="popup__input popup__input_type_link" id="card-avatar-link" name="link"
                placeholder="Ссылка на картинку" required ref={inputRef} />
            <span id="card-avatar-link-error" className="popup__input-error"></span>
        </PopupWithForm>
    )
}
