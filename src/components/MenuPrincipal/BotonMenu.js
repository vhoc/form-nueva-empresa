import { Button } from 'react-bootstrap'
import { useNavigate, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logOut } from '../../Helpers'
import './BotonMenu.css'

const BotonMenu = ( {titulo, variant, icon, logoutBtn} ) => {

    const redirectTo = useNavigate()

    return (
        <>
        <Button
            variant={variant}
            onClick={ async (event) => {
                if ( logoutBtn === true )
                {
                   // console.log( await logOut() )
                   const logOutResult = await logOut()

                   console.log( logOutResult )

                    if (logOutResult === 200 ) {
                        console.log("I'm supposes to redirect to login")
                        redirectTo( '/login', { replace: true } )
                    }
                } else {
                    event.preventDefault()
                }
            } }
            className="boton-menu d-flex flex-column align-items-center justify-content-center"
        >
            <FontAwesomeIcon icon={ icon } />
            {titulo}
        </Button>
        </>

    )
    
    
}

export default BotonMenu