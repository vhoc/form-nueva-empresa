import BarraTitulo from "../BarraTitulo/BarraTitulo"
import BotonMenu from "./BotonMenu"
import { Link } from 'react-router-dom'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const MenuPrincipal = () => {

    const usuario = localStorage.getItem('userName')

    return (

        <>
        
            <BarraTitulo titulo={ `Bienvenido, ${usuario}` } />

            <div className="d-flex flex-wrap p-3 gap-3">
                <Link to="/nueva-empresa"><BotonMenu titulo="Nueva Empresa" variant="info" icon={ faPlus }/></Link>
                <BotonMenu titulo="Soporte" variant="warning" icon={ faQuestion }/>
                <Link to="/suscripciones"><BotonMenu titulo="Suscripciones" variant="success" icon={ faShoppingCart }/></Link>
                <BotonMenu titulo="Salir" variant="primary" icon={ faSignOutAlt } logoutBtn={true} />
            </div>
        
        </>

    )

}

export default MenuPrincipal