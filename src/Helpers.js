import axios from 'axios'


export const validateToken = () => {

    try {
        axios.get('https://venka.app/api/validateToken', { 
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Accept': 'application/json',
            }
        })
        console.log("Authentication Successful")
        return true
    } catch ( error ) {
        console.log("Invalid Token, You shall not pass.")
        localStorage.clear()
        return false
    }

}

export const validateStoredUser = () => {
    // check if all props are supplied from localStorage
    if ( localStorage.getItem('userId') && localStorage.getItem('userEmail') && localStorage.getItem('userName') && localStorage.getItem('token') ) {
         console.log(`stored user true`)
        return true
    }
    
    // Prop(s) missing.
    console.log(`stored user false`)
    return false
}

export const validateAuth = () => {
    if ( validateStoredUser() === true && validateToken() === true ) {
        return true
    } else {
        return false
    }
}

export const logOut = () => {

    axios.get('https://venka.app/api/logout', {
        headers: {
            'Authorization': localStorage.getItem('token'),
        }
    }).then( () => {
        console.log("Logout Successful")
        localStorage.clear()
        //redirectTo('/login', { replace: true })
     }).catch(error => {
         console.error(error)
         return false
     }).finally( () =>{
        return false
     } )
}