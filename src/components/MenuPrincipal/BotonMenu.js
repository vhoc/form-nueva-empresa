import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './BotonMenu.css'
import axios from "axios"

const BotonMenu = ( {titulo, variant, icon, logoutBtn} ) => {

    const logOut = () => {
        console.log('intentando logout')
        axios.post('https://venka.app/api/logout', {
                'Authorization': localStorage.getItem('token')
        }).then( response => {
            console.log(response)
        } )
    }

    return (
        <>
        <Button
            variant={variant}
            onKeyUp={ logOut }
            className="boton-menu d-flex flex-column align-items-center justify-content-center"
        >
            <FontAwesomeIcon icon={ icon } />
            {titulo}
        </Button>
        </>

    )
    
    
}

export default BotonMenu