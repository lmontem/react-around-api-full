import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleName(e) {
        setName(e.target.value);
    }
    function handleDescription(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        // Prevent the browser from navigating to the form address
        e.preventDefault();
        // Pass the values of the managed components to the external handler
        props.onUpdateUser(
            name,
            description,
        );
    }
    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser]);

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name='edit-profile' title='Edit Profile'>
            <div>
                <label className="popup__label">
                    <input className="popup__input popup__input_type_name" id="name-input" type="text" value={name} onChange={handleName} name="name" placeholder="name" required minLength="2" maxLength="40" />
                    <span className="popup__input-error" id="name-input-error">
                    </span>
                </label>
                <label className="popup__label">
                    <input className="popup__input popup__input_type_about" id="about-input" type="text" value={description} onChange={handleDescription} name="about" placeholder="about me" required minLength="2" maxLength="200" />
                    <span className="popup__input-error" id="about-input-error">
                    </span>
                </label>
                <button className="popup__save-btn" type="submit" aria-label="Save">Save</button>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;