import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import BarraTitulo from "../../components/BarraTitulo/BarraTitulo"
import axios from 'axios'
import { faHome } from "@fortawesome/free-solid-svg-icons"

const Suscripciones = () => {

    const [empresas, setEmpresas] = useState([])
    const usuario = localStorage.getItem('userId')
    const usuarioNombre = localStorage.getItem('userName')
    const redirectTo = useNavigate()

    const handleRenewButton = ( id ) => {

        redirectTo( `/soluciones`, {
            state: {
                solutionType: 'suscription',
                backRoute: '/suscripciones',
                empresaId: id
            }
        })
    
    }

    useEffect( () => {
        const getEmpresas = async () => {
            try {
                const response = await axios.get(`https://venka.app/api/usuario-empresas/${usuario}`, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                setEmpresas( await response.data )
    
            } catch ( error ) {
                console.log(error)
            }
        }

        getEmpresas()
    }, [usuario, usuarioNombre])

    return (
        <>
            <BarraTitulo titulo="Suscripciones" linkButton={'/'} linkButtonIcon={faHome} />

            <div className='d-flex justify-content-center p-3 m-3 card text-center table-responsive'>

                <table className="table table-striped col-12">
                    <thead>
                        <tr>
                            <th>Nombre comercial</th>
                            <th>Status</th>
                            <th>Último pago</th>
                            <th>Expiración</th>                            
                            <th>Acciones</th>
                        </tr>
                    </thead>                

                    <tbody>
                        {empresas.map( (empresa) => (
                            <tr key={empresa.id}>
                                <td className='text-left'>{empresa.nomcom_emp}</td>
                                <td>{empresa.status_emp >= 1 ? 'Activa' : 'Suspendida'}</td>
                                <td>{empresa.fecha_last_pay}</td>
                                <td>{empresa.fecha_venc}</td>
                                <td><Button variant='success' size='sm' onClick={ () => { handleRenewButton(empresa.id) } }>Renovar</Button></td>
                            </tr>
                        ) )}
                    </tbody>
                    

                </table>

            </div>

        </>
    )

}

export default Suscripciones