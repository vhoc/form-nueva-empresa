import { Button } from 'react-bootstrap'
//import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './BotonMenu.css'

const BotonMenu = ( {titulo, variant, icon, logoutBtn} ) => {

    //const redirectTo = useNavigate()

    return (
        <>
        <Button
            variant={variant}
            onClick={ async () => {
                if ( logoutBtn === true )
                window.location.href = "https://venka.app/"
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