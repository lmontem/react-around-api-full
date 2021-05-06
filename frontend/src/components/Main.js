import React from "react";
import Card from './Card.js';
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main(props) {

    const currentUserContext = React.useContext(CurrentUserContext);

    return (
        (
            <main className="content">

                <section className="profile">
                    <div className="profile__avatar-container">
                        <img className="profile__avatar" src={currentUserContext.avatar} alt="profile" />
                        <button onClick={props.handleEditAvatarClick} className="profile__edit-avatar" aria-label="edit-avatar" type="button"></button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUserContext.name}</h1>
                        <button onClick={props.handleEditProfileClick} className="profile__edit-btn" type="button" aria-label="Edit profile"></button>
                        <p className="profile__occupation">{currentUserContext.about}</p>

                    </div>
                    <button onClick={props.handleAddPlaceClick} className="profile__add-btn" type="button" aria-label="Add picture"></button>
                </section>
                <section className="cards">
                    {props.cards.map((card) => (
                        <Card card={card}
                            key={card._id}
                            onCardClick={() => { props.handleCardClick(card) }}
                            onCardLike={() => { props.handleCardLike(card) }}
                            onCardDelete={() => { props.handleCardDelete(card) }}
                            onDeleteClick={() => { props.handleDeleteCardClick(card) }}
                        />
                    )
                    )}
                </section>
            </main>
        )
    )

}

export default Main;