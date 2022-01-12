import axios from 'axios'

const validateToken = async ( token ) => {

    try {
        await axios.get('https://venka.app/api/validateToken', { 
            headers: {
                'Authorization': token,
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

export const validateStoredUser = ( token, userId, userName, userEmail ) => {
    // check if all props are supplied from localStorage
    if ( token && userId && userName && userEmail ) {
        // if all present, validate token
        //const tokenIsValid = validateToken( localStorage.getItem('token') )
        return validateToken( localStorage.getItem('token') ) ? true : false
        //return true
    }
    
    // Prop(s) missing.
    return false
}

export const logOut = () => {
    axios.get('https://venka.app/api/logout', {
        headers: {
            'Authorization': localStorage.getItem('token'),
        }
    }).then( () => {
        console.log("Logout Successful")
        localStorage.clear()
        return true
     }).catch(error => {
         console.error(error)
         return false
     }).finally( () =>{
        return false
     } )
}