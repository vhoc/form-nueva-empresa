import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './BotonMenu.css'

const BotonMenu = ( {titulo, variant, icon, onKeyUp} ) => {

    return (
        <>
        <Button
            variant={variant}
            onKeyUp={onKeyUp}
            className="boton-menu d-flex flex-column align-items-center justify-content-center"
        >
            <FontAwesomeIcon icon={ icon } />
            {titulo}
        </Button>
        </>

    )
    
    
}

export default BotonMenu