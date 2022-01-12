import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './BotonMenu.css'
import axios from "axios"

const BotonMenu = ( {titulo, variant, icon, logoutBtn} ) => {

    const logOut = () => {
        console.log('intentando logout')
        axios.get('https://venka.app/api/logout', {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }).then( response => {
            console.log(response)
        } )
    }

    return (
        <>
        <Button
            variant={variant}
            onKeyUp={ event => {
                if ( logoutBtn === true )
                {
                    logOut()
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