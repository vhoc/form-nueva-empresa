import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"

const BarraTitulo = ( {titulo, linkButton, linkButtonIcon, usuario} ) => {

    const redirectTo = useNavigate()

    const handleLoadUserOptions = id => {
        redirectTo( '/usuario', {
            state: {
                id: id,
            }
        } )
    }

    return (

        <div className="d-flex container-fluid bg-section-title p-2 justify-content-between">
            <h3 className='px-4'>{ titulo }</h3>
            { usuario &&
                <Button onClick={() => { handleLoadUserOptions(localStorage.getItem('userId')) }} ><FontAwesomeIcon icon={faUserEdit}></FontAwesomeIcon> Opciones de Usuario</Button>
            }

            { linkButton ? <Link to={ linkButton }><Button><FontAwesomeIcon icon={linkButtonIcon}></FontAwesomeIcon> Regresar</Button></Link> : <></> }
        </div>
    )

}

export default BarraTitulo