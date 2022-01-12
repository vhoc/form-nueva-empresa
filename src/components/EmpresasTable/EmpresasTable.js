import BarraTitulo from '../BarraTitulo/BarraTitulo'
import './../Section.css'

const EmpresasTable = () => {

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