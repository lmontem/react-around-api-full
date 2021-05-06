import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name='avatar' title='Change profile picture'
        >
            <div>
                <label className="popup__label"><input ref={avatarRef} className="popup__input popup__input_type_avatar-link"
                    id="avatar-input" type="url" name="link" placeholder="Avatar Link" required />
                    <span className="popup__input-error" id="avatar-input-error"></span>
                </label>
                <button className="popup__save-btn" type="submit" aria-label="Save">Update</button>
            </div>
        </PopupWithForm>
    )

}

export default EditAvatarPopup;
