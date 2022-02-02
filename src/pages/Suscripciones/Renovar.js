import { useEffect, useState , useRef } from "react"
import BarraTitulo from "../../components/BarraTitulo/BarraTitulo"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { InputGroup, FormControl } from "react-bootstrap"
import { Formik, Field, Form } from 'formik'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css';
import { conektaHelper } from '../../Helpers';
import Swal from 'sweetalert2';
import MaskedInput from 'react-maskedinput';

const Renovar = ( { empresaId } ) => {

    const [isLoading, setIsLoading] = useState(true)
    const [empresa, setEmpresa] = useState()
    const [ultimaSuscripcion, setUltimaSuscripcion] = useState('No hay registro')
    const [vencimiento, setVencimiento] = useState('No hay registro')
    const [status, setStatus] = useState(true)
    const formikRef = useRef();

    const conektaSuccessResponseHandler = async (token) => {
        
        if(formikRef) {
        console.log(formikRef.current.values.paquete);
        }
      
        Swal.fire('Token', 'Token creado con exito'+token.id, 'success')
        try {
            const post = { token: token.id, empresa: empresaId , email: localStorage.getItem('userEmail'), paquete: formikRef.current.values.paquete, name: formikRef.current.values.name } 
            const res = await axios.post(`https://venka.app/api/subscribe`, post,{
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Accept': 'application/json',
                }
            })
            
           console.log( await res.data);
           

           
       } catch ( error ) {
        
        Swal.fire('Error', error, 'error')
        
       }
        

    }

    const errorCallback = (error) => {
       
        Swal.fire('Error', error.message, 'error')
    }


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

    useEffect(() => {
        const script = document.createElement('script');
    
        script.src = "https://cdn.conekta.io/js/latest/conekta.js";
        script.async = true;
        script.setAttribute("data-conekta-public-key", window.env.REACT_APP_CONEKTA_KEY);
        console.log(script);
    
        document.body.appendChild(script);
    
        return () => {
        document.body.removeChild(script);
        }
    }, []);

   

    return (
        
        <div className="container-fluid d-flex flex-column align-items-center p-0">

            <BarraTitulo titulo={ `Renovación de Suscripción` } linkButton={'/'} linkButtonIcon={faHome} />

            {isLoading ? (<div>Cargando...</div>) :
            
                <div className='d-flex flex-column align-items-center justify-content-center p-5 w-100'>
                    <div className="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-6">
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
                            innerRef={formikRef}
                            enableReinitialize={true}

                            // INPUTS' INITIAL VALUES
                            initialValues={{
                                empresaId: empresaId,
                                paquete: '1y',
                                cvc: '',
                                expiry: '',
                                name: '',
                                number: '',
                            }}

                            // VALIDATIONS
                            validate={values => {
                                const errors = {};
        
                                // Número de Tarjeta de Crédito
                                if ( !values.number ) {
                                    errors.number = 'Requerido';
                                } else if (
                                    !/\b(\d){16,22}\b/g.test(values.number)
                                ) {
                                    errors.number = 'Solo se permiten entre 16 y 22 dígitos.';
                                }
                                

                                // Fecha de Vencimiento de la Tarjeta
                                if ( !values.expiry ) {
                                    errors.expiry = 'Requerido';
                                } 
                                
                                // Se borro esta validación porque el componente de inputmask ya valida la fecha
                                
                                /*else if (
                                    !/\b(\d){4}\b/g.test(values.expiry)
                                ) {
                                    errors.expiry = 'Solo se permiten entre 4 dígitos.';
                                }*/

                                // Nombre del cuentahabiente
                                if ( !values.name ) {
                                    errors.name = 'Requerido';
                                } else if (
                                    !/^([a-z]|\d|\s){3,120}$/i.test(values.name)
                                ) {
                                    errors.name = 'Se permiten de 3 a 120 caracteres';
                                }

                                 // cvc
                                 if ( !values.cvc ) {
                                    errors.cvc = 'Requerido';
                                } 
                                
                                return errors;

                            }}

                            // SUBMIT EVENT HANDLER
                            onSubmit={ async values => {

                               let arr = values.expiry.split('/');
                               conektaHelper.tokenize(values.number, values.name,arr[0],arr[1],values.cvc, conektaSuccessResponseHandler, errorCallback);

                            } }

                        >
                        {/**
                         * FORM STARTS HERE
                         */}
                        { ({values, errors, touched, handleChange, handleBlur, isSubmitting}) => (
                            <>
                                

                                <Form className="d-flex flex-column" >
                                    <Field name="paquete" as="select" className="form-control mb-3" >
                                        <option value="1m">1 mes x $900</option>
                                        <option value="6m">6 meses x $5,100 ($850.00 mensuales)</option>
                                        <option value="1y">12 meses x $8,900 ($741.66 mensuales)</option>
                                    </Field>
                                    
                                    <div className="row">

                                        <div className="col-12 col-lg-7 mb-2">
                                            <Cards
                                                cvc={values.cvc}
                                                expiry={values.expiry}
                                                name={values.name}
                                                number={values.number}
                                            />
                                        </div>

                                        <div className="col-12 col-lg-5 my-auto">

                                           
                                               {/* 
                                               <MaskedInput 
                                                 className="form-control mb-2"
                                                 placeholder="Número de tarjeta de crédito."
                                                 mask="1111 1111 1111 1111" 
                                                 name="number"
                                                 size="22"
                                                 inputmode="numeric" 
                                                 onChange={handleChange}
                                                 onBlur={handleBlur}
                                                />
                                               */} 
                                           

                                           <input
                                                className="form-control mb-2"
                                                type="number"
                                                name="number"
                                                placeholder="Número de tarjeta de crédito."
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                           
                                            
                                            <small className='form-text text-red'>{ errors.number && touched.number && errors.number }</small>

                                            {/*<input
                                                className="form-control mb-2"
                                                type="number"
                                                name="expiry"
                                                placeholder="Fecha de Vencimiento."
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />*/}

                                                <MaskedInput 
                                                 className="form-control mb-2"
                                                 placeholder="Fecha de Vencimiento."
                                                 mask="11/11" 
                                                 name="expiry"
                                                 size="5"
                                                 onChange={handleChange}
                                                 onBlur={handleBlur}
                                                />  

                                            <small className='form-text text-red'>{ errors.expiry && touched.expiry && errors.expiry }</small>

                                            <input
                                                className="form-control mb-2"
                                                type="number"
                                                name="cvc"
                                                placeholder="cvc"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <small className='form-text text-red'>{ errors.cvc && touched.cvc && errors.cvc }</small>

                                            <input
                                                className="form-control mb-2"
                                                type="text"
                                                name="name"
                                                placeholder="Nombre del cuentahabiente"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <small className='form-text text-red'>{ errors.name && touched.name && errors.name }</small>
                                            
                                            
                                        </div>

                                    </div>

                                    <button className="btn btn-primary mt-3" type="submit">
                                        Pagar
                                    </button>
                                </Form>
                            </>

                            
                        ) }
                        </Formik>

                    </div>
                </div>
            
            }

            

        </div>

    )

}

export default Renovar