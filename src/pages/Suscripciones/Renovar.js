import { useState, useEffect, useRef } from "react"
import BarraTitulo from "../../components/BarraTitulo/BarraTitulo"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { InputGroup, FormControl } from "react-bootstrap"
import { Formik, Field, Form } from 'formik'

const Renovar = ( { empresaId } ) => {

    const [isLoading, setIsLoading] = useState(true)
    const [empresa, setEmpresa] = useState()
    const [ultimaSuscripcion, setUltimaSuscripcion] = useState('No hay registro')
    const [vencimiento, setVencimiento] = useState('No hay registro')
    const [status, setStatus] = useState(true)



    useEffect(() => {
        const getEmpresa = async ( id ) => {
            setIsLoading(true)

           try {
                const response = await axios.get(`https://venka.app/api/empresa/${id}`, {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Accept': 'application/json',
                    }
                })
                setEmpresa( await response.data )
                setUltimaSuscripcion( await response.data.fecha_last_pay )

                if ( await response.data.fecha_last_pay ) {
                    setUltimaSuscripcion( await response.data.fecha_last_pay )
                } else {
                    setUltimaSuscripcion('No hay registro')
                }

                setVencimiento( await response.data.fecha_venc )

                const currentDate = Date.now()
                const fechaVenc = new Date(await response.data.fecha_venc)

                if ( currentDate > fechaVenc ) {
                    setStatus(false)
                } else {
                    setStatus(true)
                }
               

               setIsLoading(false)
           } catch ( error ) {
            setIsLoading(false)
               console.log(error)
           }
       }       
   
       getEmpresa( empresaId )
   }, [empresaId])

    return (
        
        <div className="container-fluid d-flex flex-column align-items-center p-0">

            <BarraTitulo titulo={ `Renovación de Suscripción` } linkButton={'/'} linkButtonIcon={faHome} />

            {isLoading ? (<div>Cargando...</div>) :
            
                <div className='d-flex flex-column align-items-center justify-content-center p-5 w-100'>
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                        <h1 className="mb-3">{empresa.nomcom_emp}</h1>

                        <InputGroup className="mb-3 align-items-center">
                            { ultimaSuscripcion === 'No hay registro' ?
                                <FontAwesomeIcon className="me-1 col-1" icon={faExclamationTriangle} color="Tomato" size="lg"></FontAwesomeIcon>
                                :
                                <FontAwesomeIcon className="me-1 col-1" icon={faCheck} color="Green" size="lg"></FontAwesomeIcon>
                            }
                            <InputGroup.Text id="ultimaSuscripcion" className="col-5">Última Suscripción</InputGroup.Text>
                            <FormControl
                                className="col-6"
                                aria-label="ultimaSuscripcion"
                                aria-describedby="ultimaSuscripcion"
                                readOnly
                                disabled
                                value={ ultimaSuscripcion === null ? '' : ultimaSuscripcion }
                            />
                            
                        </InputGroup>
                        
                        <InputGroup className="mb-3 align-items-center">
                            { ! status ?
                                <FontAwesomeIcon className="me-1 col-1" icon={faExclamationTriangle} color="Tomato" size="lg"></FontAwesomeIcon>
                                :
                                <FontAwesomeIcon className="me-1 col-1" icon={faCheck} color="Green" size="lg"></FontAwesomeIcon>
                            }
                            <InputGroup.Text id="fechaVencimiento" className="col-5">Fecha de Vencimiento</InputGroup.Text>
                            <FormControl
                                className="col-6"
                                aria-label="fechaVencimiento"
                                aria-describedby="fechaVencimiento"
                                readOnly
                                disabled
                                value={vencimiento === null ? '' : vencimiento}
                            />
                            
                            
                        </InputGroup>

                        <h3>Elija un paquete de suscripción</h3>
                        
                        <Formik
                            enableReinitialize={true}

                            initialValues={{
                                empresaId: '',
                                paquete: '1y',
                            }}

                            onSubmit={ async values => {

                            } }

                        >

                        { ({isSubmitting}) => (
                            <Form>
                                <Field name="paquete" as="select" className="form-control">
                                    <option value="1m">1 mes x $900</option>
                                    <option value="6m">6 meses x $5,100 ($850.00 mensuales)</option>
                                    <option value="1y">12 meses x $8,900 ($741.66 mensuales)</option>
                                </Field>
                            </Form>
                        ) }
                        </Formik>

                    </div>
                </div>
            
            }

            

        </div>

    )

}

export default Renovar