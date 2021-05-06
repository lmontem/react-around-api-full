import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
    function handleSubmit(e) {
        e.preventDefault();
        props.onCardDelete(props.selectedCard)
    }
    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name='delete-confirm' title='Are you sure?'
        >
            <button className="popup__save-btn" type="submit" aria-label="Save">Yes</button>
        </PopupWithForm>
    )

}

export default DeleteCardPopup;