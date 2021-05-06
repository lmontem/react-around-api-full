function ImagePopup(props) {
    return (
        (<div className={`popup popup__type_${props.name} ${props.isOpen ? "popup__opened" : ""}`}>
            <div className="popup__image-container">
                <button className="popup__close-btn" type="button" aria-label="Close" onClick={props.onClose}></button>
                <figure className="popup__figure">
                    <img className="popup__image" src={props.selectedCard.link} alt='' />
                    <figcaption className="popup__image-title">{props.selectedCard.name}</figcaption>
                </figure>
            </div>

        </div>

        ))
}

export default ImagePopup;