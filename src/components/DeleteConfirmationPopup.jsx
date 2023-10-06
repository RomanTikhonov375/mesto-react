import React from "react"
import PopupWithForm from "./PopupWithForm.jsx"

export default function DeleteConfirmationPopup(props) {
       
        const isDirty = true; // Костыль , для сдачи работы, после проверки переделаю все формы с помощью react-hook-form
        const isValid = true; // Костыль , для сдачи работы, после проверки переделаю все формы с помощью react-hook-form

        function handleDelete(e) {
            console.log(props)
            e.preventDefault();
            props.onCardDelete(props.card, props.setCards)
            props.onClose();
        }

        
    return (
        <PopupWithForm
        onSubmit={handleDelete}
        isDirty={isDirty}
        isValid={isValid}
        buttonText={!props.isLoading ? 'Да' : 'Удаление...'}
        isOpen={props.isOpen}
        onClose={props.onClose}
        title="Вы уверены?"
        name="delete-popup"
      />
    )
}