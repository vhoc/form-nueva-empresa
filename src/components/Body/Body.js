import { Formik, Field } from 'formik'
import './Body.css'

const Body = () => {
    return(
        <div className="container d-flex flex-column align-items-center p-5">
            
            <Formik

                initialValues={
                    {
                        email: '',
                        nombreCliente: '',
                        nombreEmpresa: '',
                        telefono: '',
                        direccionEmpresa: '',
                        mesas: 0,
                        pax: 0,
                    }
                }

                validate={values => {
                    const errors = {};

                    // E-mail Validation
                    if ( !values.email ) {
                        errors.email = 'Requerido';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Dirección de correo inválida';
                    }

                    // Nombre del cliente
                    if ( !values.nombreCliente ) {
                        errors.nombreCliente = 'Requerido';
                    } else if (
                        !/^([a-záéíóú'´üñ]|\s){3,50}$/i.test(values.nombreCliente)
                    ) {
                        errors.nombreCliente = 'Se permiten de 3 a 50 caracteres, únicamente letras y espacios.';
                    }

                    // Nombre de Empresa o Sucursal
                    if ( !values.nombreEmpresa ) {
                        errors.nombreEmpresa = 'Requerido';
                    } else if (
                        !/^([a-z]|\d|\s){3,50}$/i.test(values.nombreEmpresa)
                    ) {
                        errors.nombreEmpresa = 'Se permiten de 3 a 50 caracteres, únicamente letras, números y espacios.';
                    }

                    // Teléfono de Contacto
                    if ( !values.telefono ) {
                        errors.telefono = 'Requerido';
                    } else if (
                        !/(?:(\+1)[ -])?\(?(?<areacode>\d{3})\)?[ -]?(\d{3})[ -]?(\d{4})/gm.test(values.telefono)
                    ) {
                        errors.telefono = 'Formato inválido para un número telefónico.';
                    }

                    // Dirección de la Empresa o Sucursal
                    if (
                        !/^([a-z0-9\s\-#.':;,´`áéíóúü()]){3,150}$/gi.test(values.direccionEmpresa)
                    ) {
                        errors.direccionEmpresa = 'La dirección no debe tener símbolos inválidos y debe ser entre 3 y 150 caracteres.';
                    }

                    // Mesas
                    if (
                        !/^(\d){0,3}$/i.test(values.mesas)
                    ) {
                        errors.mesas = 'Se permiten de 0 a 300 mesas.';
                    }

                    return errors;
                }}

                onSubmit={ (values, {setSubmitting}) => {
                    setTimeout( () => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400 );
                }}

            >

            { ({ values, errors, initialTouched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                
                <form onSubmit={handleSubmit} className='col-12 col-lg-6 text-center'>

                    {/**
                     * INPUT-EMAIL
                     * Correo Electrónico
                    */}
                    <div className='form-group text-left mb-3'>
                        <label htmlFor='inputEmail'>Correo electrónico <span className='text-red'>*</span></label>
                        <input
                            className='form-control'
                            id="inputEmail"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        <small className='form-text text-muted'>Éste será su <strong>Nombre de Usuario</strong> para ingresar en la aplicación y ver las ventas de sus negocios.</small>
                    { errors.email && initialTouched.email && errors.email }
                    </div>

                    {/**
                     * INPUT-TEXT
                     * Nombre Personal del Usuario
                    */}
                    <div className='form-group text-left mb-3'>
                        <label htmlFor='inputNombreCliente'>Nombre y Apellidos <span className='text-red'>*</span></label>
                        <input
                            className='form-control'
                            id="inputNombreCliente"
                            type="text"
                            name="nombreCliente"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nombreCliente}
                        />
                        <small className='form-text text-muted'>El nombre del usuario principal de la cuenta.</small>
                    { errors.nombreCliente && initialTouched.nombreCliente && errors.nombreCliente }
                    </div>

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
                            name="nombreEmpresa"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nombreEmpresa}
                        />
                        <small className='form-text text-muted'>El nombre de su empresa, sucursal o establecimiento.</small>
                    { errors.nombreEmpresa && initialTouched.nombreEmpresa && errors.nombreEmpresa }
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
                                        name='mesas'
                                        type='number'
                                        min='0'
                                        max='300'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.mesas}
                                    />

                                </div>

                                <div className='d-flex flex-column flex-fill w-50'>
                                    <label htmlFor='inputPax'>Comensales (PAX)</label>
                                        <input
                                            id='inputPax'
                                            className='form-control'
                                            name='pax'
                                            type='number'
                                            min='0'
                                            max='2000'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.pax}
                                        />
                                </div>
                                
                            </div>

                            <small className='form-text text-muted'>Si su negocio es sólo para llevar y/o para recoger, puede dejar estos valores en 0</small>

                        </div>
                        
                    </div>

                    {/**
                     * INPUT-TEXT
                     * Teléfono de contacto
                    */}
                    <div className='form-group text-left mb-3'>
                        <label htmlFor='inputTelefono'>Teléfono de contacto<span className='text-red'>*</span></label>
                        <input
                            className='form-control'
                            id="inputTelefono"
                            type="tel"
                            name="telefono"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.telefono}
                        />
                        <small className='form-text text-muted'>Número telefónico para ponernos en contacto con usted o su negocio.</small>
                    { errors.telefono && initialTouched.telefono && errors.telefono }
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
                            name="direccionEmpresa"
                            component="textarea"
                            rows="4"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.direccionEmpresa}
                        ></Field>
                        <small className='form-text text-muted'>Calle, Número, Colonia, Código Postal, Ciudad y Estado.</small>
                    { errors.direccionEmpresa && initialTouched.direccionEmpresa && errors.direccionEmpresa }
                    </div>

                    <button className='btn btn-primary my-3' disabled={isSubmitting} onKeyDown={handleSubmit}>
                        Enviar
                    </button>

                </form>

            ) }
            
            </Formik>
        </div>
    )
}

export default Body