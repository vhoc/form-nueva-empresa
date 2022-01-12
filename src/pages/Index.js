import { useEffect } from 'react'
import axios from 'axios'
import MenuPrincipal from "../components/MenuPrincipal/MenuPrincipal"
import EmpresasTable from "../components/EmpresasTable/EmpresasTable"

const Index = () => {

    const validateToken = async ( token ) => {

        console.log( "Validating token... ah! got cha!" )
        try {
            const response = await axios.get('https://venka.app/api/validateToken', { 
                headers: { 'Authorization': token }
            })
            console.log(response)
        } catch ( error ) {
            localStorage.clear()
        }

    }

    const validateStoredUser = ( token, userId, userName, userEmail ) => {

        // check if all props are supplied from localStorage
        if ( token && userId && userName && userEmail ) {
            // if all present, validate token
            validateToken( localStorage.getItem('token') )
            return true
        }
        
        // Prop(s) missing.
        return false

    }

    useEffect( () => {
        validateStoredUser( 'a token', 'an user id', 'an userName', 'an userEmail' )
    }, [] )


    return (
        <div className="container-fluid p-0">

            <MenuPrincipal />
            <EmpresasTable />

        </div>
    )
}

export default Index