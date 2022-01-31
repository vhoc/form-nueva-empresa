import { Button } from 'react-bootstrap'
//import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logOut } from '../../Helpers'
import './BotonMenu.css'

const BotonMenu = ( {titulo, variant, icon, logoutBtn} ) => {

    //const redirectTo = useNavigate()

    return (
        <>
        <Button
            variant={variant}
            onClick={ async () => {
                if ( logoutBtn === true )
                {
                   const logOutResult = await logOut()
                    if (logOutResult === 200 ) {
                        //redirectTo( '/login', { replace: true } )
                        window.location.href = "https://venka.app/"
                    } else {
                        console.error( logOutResult )
                    }
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