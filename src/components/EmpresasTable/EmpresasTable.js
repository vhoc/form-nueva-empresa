import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import BarraTitulo from '../BarraTitulo/BarraTitulo'
import './../Section.css'
import './EmpresasTable.css'

const EmpresasTable = () => {

    const [empresas, setEmpresas] = useState([])

    const usuario = localStorage.getItem('userId')
    const usuarioNombre = localStorage.getItem('userName')
    const redirectTo = useNavigate()

    const handleEditButton = ( id ) => {
        // Passing id through 'state' object to receive it in EditarEmpresa component with useLocation Hook
        redirectTo( `/editar-empresa`, { state: { id: id } } )
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
            
            <BarraTitulo titulo={`Empresas`} botonNuevo={true} />

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
                                <td><Button variant='warning' size='sm' onClick={ () => { handleEditButton( empresa.id ) } }><FontAwesomeIcon icon={ faPencilAlt } size='sm'/></Button></td>
                            </tr>
                        ) )}
                    </tbody>
                    

                </table>

            </div>

            
        </>
       

    )

}

export default EmpresasTable