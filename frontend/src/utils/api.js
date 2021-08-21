class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;

    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();//this makes object out of response
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            
    }


    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();//this makes object out of response
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            

    }
    getAllInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me
    changeUserInfo({ name, about }) {
        return fetch(this._baseUrl + '/users/me', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();//this makes object out of response
                }
                return Promise.reject(`Error: ${res.status}`)
            })
           
    }
    //POST https://around.nomoreparties.co/v1/groupId/cards
    addCard({ name, link }) {
        return fetch(this._baseUrl + '/cards', {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();//this makes object out of response
                }
                return Promise.reject(`Error: ${res.status}`)
            })
           

    }
    removeCard(cardId) {
        //fetch cards + cardid 
        return fetch(this._baseUrl + '/cards/' + cardId, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();//this makes object out of response
                }
                return Promise.reject(`Error: ${res.status}`)
            })
           
    }
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
    setAvatar({ avatar }) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
            .then(res => {

                if (res.ok) {
                    return res.json();//this makes object out of response
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            

    }
    // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    // DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    changeLikeCardStatus(cardId, like) {
        //PUT AND DELETE
        const whichMethod = like ? "DELETE" : "PUT";
        //console.log(whichMethod);
        return fetch(this._baseUrl + '/cards/' + cardId + '/likes/', {
            method: whichMethod,
            headers: this._headers,

        })
            .then(res => {
                //console.log(res);
                if (res.ok) {
                    return res.json();//this makes object out of response
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            
    }
}

const jwt = localStorage.getItem('jwt');

const api = new Api({
    baseUrl: "https://api.aroundreact.leandrashelton.com",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `token=${jwt}`
    }
});

//"https://around.nomoreparties.co/v1/group-8"




export {api};