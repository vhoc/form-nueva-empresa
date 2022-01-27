import { Navigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import Renovar from "./Suscripciones/Renovar"

const CentroSoluciones = () => {

    const location = useLocation()
    const solutionType = location.state.solutionType
    const backRoute = location.state.backRoute
    const empresaId = location.state.empresaId

    if( solutionType === 'suscription' ) {

        return (
            <Renovar empresaId={empresaId} backRoute={backRoute}/>
        )

    }

    return (
        <Navigate to='/'/>
    )

}

export default CentroSoluciones