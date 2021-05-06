import CurrentUserContext from "../contexts/CurrentUserContext.js";
import React from "react";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    // Checking if you are the owner of the current card
    const isOwn = props.card.owner._id === currentUser._id;

    // Creating a variable which you'll then set in `className` for the delete button
    const cardDeleteButtonClassName = (
        `card__delete-btn ${isOwn ? 'card__delete-btn_visible' : 'card__delete-btn_hidden'}`
    );
    // Check if the card was liked by the current user
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Create a variable which you then set in `className` for the like button
    const cardLikeButtonClassName = (
        `card__like-btn ${isLiked ? 'card__like-btn_active' : 'card__like-btn'}`
    );

    return ((
        <div className="card">
            <button className={cardDeleteButtonClassName} onClick={props.onDeleteClick} type="button" aria-label="Delete"></button>
            <div onClick={handleClick} className="card__image" style={{ backgroundImage: `url(${props.card.link})` }}></div>
            <h2 className="card__heading">{props.card.name}</h2>
            <button className={cardLikeButtonClassName} type="button" aria-label="Like" onClick={handleLikeClick}></button>
            <p className="card__like-count">{props.card.likes.length}</p>
        </div>
    ))
}



export default Card;