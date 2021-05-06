import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleCardName(e) {
        setName(e.target.value);
    }
    function handleLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(
            name,
            link
        );
        setName('');
        setLink('');
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name='add-card' title='New Place'
        >
            <div>
                <label className="popup__label"><input className="popup__input popup__input_type_title" id="title-input"
                    type="text" value={name} onChange={handleCardName} name="name" placeholder="Title" required minLength="2" maxLength="30" />
                    <span className="popup__input-error" id="title-input-error"></span>
                </label>
                <label className="popup__label"> <input className="popup__input popup__input_type_image-link"
                    id="image-input" type="url" value={link} onChange={handleLink} name="link" placeholder="Image Link" required />
                    <span className="popup__input-error" id="image-input-error"></span>
                </label>
                <button className="popup__save-btn" type="submit" aria-label="Save">Save</button>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;