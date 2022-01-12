import BarraTitulo from "../BarraTitulo/BarraTitulo"
import BotonMenu from "./BotonMenu"
import { Link } from 'react-router-dom'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const MenuPrincipal = () => {

    return (

        <>
        
            <BarraTitulo titulo="Menú Principal" />

            <div className="d-flex flex-wrap p-3 gap-3">
                <Link to="/nueva-empresa"><BotonMenu titulo="Nueva Empresa" variant="info" icon={ faPlus }/></Link>
                <BotonMenu titulo="Soporte" variant="warning" icon={ faQuestion }/>
                <BotonMenu titulo="Suscripciones" variant="success" icon={ faShoppingCart }/>
                <BotonMenu titulo="Salir" variant="primary" icon={ faSignOutAlt } logoutBtn={true} />
            </div>
        
        </>

    )

}

export default MenuPrincipal