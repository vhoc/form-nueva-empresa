import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './BotonMenu.css'
import axios from "axios"

const BotonMenu = ( {titulo, variant, icon, logoutBtn} ) => {

    const redirectTo = useNavigate()

    const logOut = () => {
        console.log('intentando logout')
        console.log(localStorage.getItem('token'))
        axios.get('https://venka.app/api/logout', {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }).then( response => {
            console.log(response)
         }).catch(error => {
             console.error(error)
         }).finally( () =>{
            redirectTo( "/login" )
         } )
    }

    return (
        <>
        <Button
            variant={variant}
            onClick={ event => {
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