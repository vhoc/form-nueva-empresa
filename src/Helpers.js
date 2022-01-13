import axios from 'axios'

export const validateToken = () => {

    try {
        axios.get('https://venka.app/api/validateToken', { 
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Accept': 'application/json',
            }
        })
        return true
    } catch ( error ) {
        localStorage.clear()
        return false
    }

}

export const validateStoredUser = () => {
    // check if all props are supplied from localStorage
    if ( localStorage.getItem('userId') && localStorage.getItem('userEmail') && localStorage.getItem('userName') && localStorage.getItem('token') ) {
        return true
    }    
    // Prop(s) missing.
    return false
}

export const validateAuth = () => {
    if ( validateStoredUser() === true && validateToken() === true ) {
        return true
    } else {
        return false
    }
}

export const logOut = async () => {
    try {
        const response = await axios.get('https://venka.app/api/logout', {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
        localStorage.clear()
        return response.data.status_code
    } catch (error) {
        return error
    }

}