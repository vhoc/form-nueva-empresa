import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const BarraTitulo = ( {titulo, linkButton, linkButtonIcon} ) => {

    return (

        <div className="d-flex container-fluid bg-section-title p-2 justify-content-between">
            <h3 className='px-4'>{ titulo }</h3>
            { linkButton ? <Link to={ linkButton }><Button><FontAwesomeIcon icon={linkButtonIcon}></FontAwesomeIcon> Regresar</Button></Link> : <></> }
        </div>
    )

}

export default BarraTitulo