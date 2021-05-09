
export const BASE_URL = "https://api.lmontem.students.nomoreparties.site";
//'https://register.nomoreparties.co'
export const register = (email, password) => {

    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            //console.log(res)
            if (res.status === 201 || res.status === 200) {
                return res.json();
            }
        })

        
}

export const authorize = (email, password) => {

    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            return res.json()
        })
        .then(data => {

            localStorage.setItem('jwt', data.token);
            return

        })

       
}

export const checkToken = (token) => {
    //console.log(token);
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `token=${token}`
        }
    })
        .then(res => {
            //console.log(res);
            return res.json()
        })
        .then(data => data)        
}