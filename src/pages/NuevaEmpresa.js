import { Formik, Field } from 'formik'
import BarraTitulo from '../components/BarraTitulo/BarraTitulo'
import './NuevaEmpresa.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { faHome } from "@fortawesome/free-solid-svg-icons"

const NuevaEmpresa = () => {
    return(
        <div className="container-fluid d-flex flex-column align-items-center p-0">

        <BarraTitulo titulo="Nueva Empresa" linkButton={'/'} linkButtonIcon={faHome} />

            <div className='d-flex justify-content-center p-5 w-100'>
            
                <Formik

                    initialValues={
                        {
                            nomcom_emp: '',
                            dircom_emp: '',
                            mesas_qty: 0,
                            pax_qty: 0,
                            status_emp: 0,
                            id_cliente: localStorage.getItem('userId'),
                        }
                    }

                    validate={values => {
                        const errors = {};

                        // Nombre de Empresa o Sucursal
                        if ( !values.nomcom_emp ) {
                            errors.nomcom_emp = 'Requerido';
                        } else if (
                            !/^([a-z]|\d|\s){3,50}$/i.test(values.nomcom_emp)
                        ) {
                            errors.nomcom_emp = 'Se permiten de 3 a 50 caracteres, únicamente letras, números y espacios.';
                        }

                        // Dirección de la Empresa o Sucursal
                        if (
                            !/^([a-z0-9\s\-#.':;,´`áéíóúü()]){3,150}$/gi.test(values.dircom_emp)
                        ) {
                            errors.dircom_emp = 'La dirección no debe tener símbolos inválidos y debe ser entre 3 y 150 caracteres.';
                        }

                        // Mesas
                        if (
                            !/^(\d){0,3}$/i.test(values.mesas_qty)
                        ) {
                            errors.mesas_qty = 'Se permite un valor de 0 a 300.';
                        }

                        // PAX
                        if (
                            !/^(\d){0,3}$/i.test(values.pax_qty)
                        ) {
                            errors.pax_qty = 'Se permite un valor de 0 a 2000.';
                        }

                        return errors;
                    }}

                    onSubmit={ (values, {setSubmitting}) => {
                        setSubmitting(true)
                        axios.defaults.withCredentials = true;

                        axios.get('https://venka.app/sanctum/csrf-cookie').then( () => {
                            axios.post('https://venka.app/api/nueva-empresa/', values, {
                                headers: {
                                    xsrfHeaderName: "X-XSRF-TOKEN",
                                    Authorization: localStorage.getItem('token'),
                                    'Accept': 'application/json'
                                }                                
                            }).then( response => {
                                if (response.data.error) {
                                    console.warn(response.data.error)
                                    setSubmitting(false)
                                    Swal.fire('Error', 'No se ha podido crear la nueva empresa', 'error')
                                } else {
                                    console.log('success')
                                    setSubmitting(false)
                                    Swal.fire('Creada', 'La empresa ha sido creada. Es necesario que nuestros técnicos realicen la instalación del servicio en su restaurante y que se realice el pago de la suscripción.', 'success')
                                }
                            } )
                        } )

                        
                    }}

                >

                { ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    
                    <form onSubmit={handleSubmit} className='col-12 col-lg-6 text-center'>

                        

                        {/**
                         * INPUT-TEXT
                         * Nombre Empresa
                        */}
                        <div className='form-group text-left mb-3'>
                            <label htmlFor='inputNombreEmpresa'>Nombre de la Empresa o Sucursal <span className='text-red'>*</span></label>
                            <input
                                className='form-control'
                                id="inputNombreEmpresa"
                                type="text"
                                name="nomcom_emp"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nomcom_emp}
                                placeholder='El nombre de su empresa, sucursal o establecimiento.'
                            />
                            <small className='form-text text-red'>{ errors.nomcom_emp && touched.nomcom_emp && errors.nomcom_emp }</small>
                            <br />
                        </div>

                        {/**
                         * INPUT-NUMBER X 2
                         */}
                        <div className='form-group text-left d-flex justify-content-between mb-3'>
                            <div className='d-flex flex-column align-items-center w-100'>

                                <div className='d-flex justify-content-between align-items-center w-100 gap-3'>

                                    <div className='d-flex flex-column justify-content-between flex-fill w-50'>

                                        <label htmlFor='inputMesas'>Mesas</label>
                                        <input
                                            id='inputMesas'
                                            className='form-control'
                                            name='mesas_qty'
                                            type='number'
                                            min='0'
                                            max='300'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.mesas_qty}
                                        />
                                        <small className='form-text text-red'>{ errors.mesas_qty && touched.mesas_qty && errors.mesas_qty }</small>
                                    </div>

                                    <div className='d-flex flex-column flex-fill w-50'>
                                        <label htmlFor='inputPax'>Comensales (PAX)</label>
                                            <input
                                                id='inputPax'
                                                className='form-control'
                                                name='pax_qty'
                                                type='number'
                                                min='0'
                                                max='2000'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.pax_qty}
                                            />
                                            <small className='form-text text-red'>{ errors.pax_qty && touched.pax_qty && errors.pax_qty }</small>
                                    </div>
                                    
                                </div>

                                <small className='form-text text-muted'>Si su negocio es sólo para llevar y/o para recoger, puede dejar estos valores en 0</small>

                            </div>
                            
                        </div>

                        {/**
                         * FIELD - TEXTAREA
                         * Dirección del establecimiento.
                         */}
                        <div className='form-group text-left'>
                            <label htmlFor='inputDireccion'>Dirección de su establecimiento</label>
                            <Field
                                className='form-control'
                                id="inputDireccion"
                                name="dircom_emp"
                                component="textarea"
                                rows="4"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dircom_emp}
                                placeholder='Calle, Número, Colonia, Código Postal, Ciudad y Estado.'
                            ></Field>
                            <small className='form-text text-red'>{ errors.dircom_emp && touched.dircom_emp && errors.dircom_emp }</small>
                        </div>

                        <button className='btn btn-primary my-3' disabled={isSubmitting} type='submit'>
                            Enviar
                        </button>

                    </form>

                ) }
                
                </Formik>
            </div>
        </div>
    )
}

export default NuevaEmpresa