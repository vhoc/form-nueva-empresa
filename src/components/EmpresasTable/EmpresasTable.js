import { useEffect, useState } from 'react'
import axios from 'axios'
import BarraTitulo from '../BarraTitulo/BarraTitulo'
import './../Section.css'

const EmpresasTable = () => {

    const [empresas, setEmpresas] = useState()

    const usuario = localStorage.getItem('userId')

    const getEmpresas = async () => {
        try {
            const response = await axios.get(`https://venka.app/api/usuario-empresas/${usuario}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log(response)
        } catch ( error ) {
            console.log(error)
        }
    }

    useEffect( () =>  { getEmpresas() }, [])

    return (

        <>
            
            <BarraTitulo titulo="Empresas" botonNuevo={true} />

            <div className='d-flex justify-content-center p-3 m-3 card text-center table-responsive'>

                <table className="table table-striped col-12">
                    <thead>
                        <tr>
                            <th>Nombre comercial</th>
                            <th>Status</th>
                            <th>Fecha de suscripción</th>
                            <th>Expiración</th>
                            <th>Último pago</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>                

                    {/** Dynamic Rows Here */}

                </table>

            </div>

            
        </>
       

    )

}

export default EmpresasTable