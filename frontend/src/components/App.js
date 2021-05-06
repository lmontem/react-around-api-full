import React from 'react';
import { Switch, Route, useHistory } from "react-router-dom";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import * as auth from '../utils/auth';
import success from '../images/success.png';
import fail from '../images/fail.png';


function App() {
    //declaring the state of popups
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
    const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false);
    //declaring state of misc
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const history = useHistory();
    const [toolTipMessage, setToolTipMessage] = React.useState('');
    const [toolTipImage, setToolTipImage] = React.useState('');

    React.useEffect(() => {
        handleCheckToken();
    }, []);

    //get initial cards and user info
    React.useEffect(() => {
        api.getAllInfo()
            .then(([userData, initialCardList]) => {
                setCurrentUser(userData);
                return (initialCardList);
            })
            .then((res) => {
                setCards(res);
            })
            .catch(err => console.log("Error: " + err));
    }, [])

  

    //handle opening of popups
    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }
    function handleDeleteCardClick(card) {
        setSelectedCard(card);
        setDeleteCardPopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }
    // handle closing of popups
    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setDeleteCardPopupOpen(false);
        setImagePopupOpen(false);
        setInfoToolTipOpen(false);
        setSelectedCard({});
    }
    //sends like info to api
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            })
            .catch(err => console.log("Error: " + err));
    }
    //sends which card was deleting to api
    function handleCardDelete(card) {

        api.removeCard(card._id)
            .then(() => {
                const newCardList = cards.filter((c) => c._id !== card._id);
                setCards(newCardList);
            })
            .then(() => closeAllPopups())
            .catch(err => console.log("Error: " + err));
    }

    //sends update on user info to api
    function handleUpdateUser(name, about) {
        api.changeUserInfo({ name, about })
            .then((userData) => {
                setCurrentUser(userData)
            })
            .then(closeAllPopups)
            .catch(err => console.log("Error: " + err));
    }
    //sends update of user image to api
    function handleUpdateAvatar(newAvatar) {
        api.setAvatar(newAvatar)
            .then((userData) => {
                setCurrentUser(userData)
            })
            .then(closeAllPopups)
            .catch(err => console.log("Error: " + err));
    }
    //sends new card info to api
    function handleAddPlaceSubmit(name, link) {
        api.addCard({ name, link })
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .then(() => { closeAllPopups() })
            .catch(err => console.log("Error: " + err));
    }

    //login 
    function handleLogin(email, password) {
        
        auth
            .authorize(email, password)
           
            .then(res => {
                
                handleCheckToken();
                
                history.push('/');
            })
            
            .catch(res => {
                if (res === 400) {
                    console.log('one of the fields was filled in in correctly')
                }
                if (res === 401) {
                    console.log('user email not found')
                }
            })
    }

    function handleRegister(email, password) {
        auth.register(email, password)
            .then(res => {
               
                if (!res) {
                    setToolTipMessage('One of the fields was filled incorrectly');
                    setToolTipImage(fail);
                    setInfoToolTipOpen(true);
                    
                }
                else {
                    setToolTipMessage('Success! You have now been registered.');
                    setToolTipImage(success);
                    setInfoToolTipOpen(true);
                    setUserEmail(userEmail);

                    history.push('/signin')
                }
            })
            .catch(err => console.log(err))
    }

    function handleSignOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setUserEmail('');
        history.push('/signin');

    }

    function handleCheckToken() {
        const jwt = localStorage.getItem('jwt')
        
        if (jwt) {
            auth
                .checkToken(jwt)               
                .then(res => {
                    if (res) {                                               
                        
                        const userEmail = res.data.email;
                        setUserEmail(userEmail);
                        setLoggedIn(true);                        
                        history.push('/')
                    }
                }
                )
                .catch(err => console.log(err))
        }
    }

    return ((
        <>
            <div className="page">
                <CurrentUserContext.Provider value={currentUser}>
                    <Switch>
                        <Route path='/signup'>
                            <Header link={'/signin'} text={"Log In"} />
                            <Register handleRegister={handleRegister} />
                        </Route>
                        <Route path='/signin'>
                            <Header link={'/signup'} text={"Sign Up"} />
                            <Login handleLogin={handleLogin} />
                        </Route>
                        <Header link={'/signin'} text={"Log out"} userEmail={userEmail} handleSignOut={handleSignOut} />
                        </Switch>
                        <ProtectedRoute
                            path='/'
                            component={Main}
                            loggedIn={loggedIn}
                            handleEditProfileClick={handleEditProfileClick}
                            handleEditAvatarClick={handleEditAvatarClick}
                            handleAddPlaceClick={handleAddPlaceClick}
                            handleDeleteCardClick={handleDeleteCardClick}
                            handleCardClick={handleCardClick}
                            cards={cards}
                            currentUser={currentUser}
                            onCardDelete={(card) => { handleCardDelete(card) }}
                            handleCardDelete={handleCardDelete}
                            onCardLike={(card) => { handleCardLike(card) }}
                            handleCardLike={handleCardLike}
                        />
                    
                    <Footer />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser} />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit} />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar} />
                    <DeleteCardPopup
                        isOpen={isDeleteCardPopupOpen}
                        selectedCard={selectedCard}
                        onClose={closeAllPopups}
                        onCardDelete={handleCardDelete}
                    />

                    <ImagePopup
                        isOpen={isImagePopupOpen}
                        selectedCard={selectedCard}
                        onClose={closeAllPopups} />

                    <InfoToolTip
                        isOpen={isInfoToolTipOpen}
                        onClose={closeAllPopups}
                        message={toolTipMessage}
                        imageURL={toolTipImage} />

                </CurrentUserContext.Provider>
            </div>
        </>
    )
    );
}

export default App;
