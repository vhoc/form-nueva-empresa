import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { validateStoredUser, logOut } from '../Helpers'
import MenuPrincipal from "../components/MenuPrincipal/MenuPrincipal"
import EmpresasTable from "../components/EmpresasTable/EmpresasTable"

const Index = () => {

    const redirect = useNavigate()

    const validateToken = async ( token ) => {

        try {
            await axios.get('https://venka.app/api/validateToken', { 
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                }
            })
            console.log("Authentication Successful")
        } catch ( error ) {
            console.log("Invalid Token, You shall not pass.")
            localStorage.clear()
            redirect('/login', { replace: true })
        }

    }
    /*
    const validateStoredUser = ( token, userId, userName, userEmail ) => {

        // check if all props are supplied from localStorage
        if ( token && userId && userName && userEmail ) {
            // if all present, validate token
            validateToken( localStorage.getItem('token') )
            return true
        }
        
        // Prop(s) missing.
        return false

    }*/
/*
    useEffect( () => {
        //validateStoredUser( 'a token', 'an user id', 'an userName', 'an userEmail' )
        validateStoredUser( 'a token', 'an user id', 'an userName', 'an userEmail' ) ? 
    }, [] )*/


    return (

        <>
            { validateStoredUser('a token', 'an user id', 'an userName', 'and userEmail') === true &&
            <div className="container-fluid p-0">
                <MenuPrincipal />
                <EmpresasTable />
            </div>
            }
        </>

    )
}

export default Index