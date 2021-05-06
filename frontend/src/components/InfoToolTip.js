import React from "react";


function InfoToolTip(props) {
    return (
        <div className={`popup popup__type_infotooltip ${props.isOpen ? 'popup__opened' : ''}`}>
            <div className='popup__box'>
                <button className='popup__close-btn' aria-label='close popup button' type='button' onClick={props.onClose}></button>
                <div className='popup__container'>
                    <img className='popup__info-image' src={props.imageURL} alt='success or fail' />
                    <p className='popup__info-message'>{props.message}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoToolTip;