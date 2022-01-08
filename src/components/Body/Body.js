import { Formik, Field } from 'formik'
import './Body.css'

const Body = () => {
    return(
        <div className="container d-flex flex-column align-items-center p-5">
            
            <Formik

                initialValues={
                    {
                        email: '',
                        nombreEmpresa: '',
                        direccionEmpresa: '',
                        mesas: 0,

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

                    // Nombre de Empresa o Sucursal
                    if ( !values.nombreEmpresa ) {
                        errors.nombreEmpresa = 'Requerido';
                    } else if (
                        !/^([a-z]|\d|\s){3,50}$/i.test(values.nombreEmpresa)
                    ) {
                        errors.nombreEmpresa = 'Se permiten de 3 a 50 caracteres, únicamente letras, números y espacios.';
                    }

                    // Dirección de la Empresa o Sucursal
                    if ( !values.direccionEmpresa ) {
                        errors.direccionEmpresa = 'Requerido';
                    } else if (
                        //!/^([a-z.áéíóú'"-:#]|\d|\s){3,150}$/im.test(values.direccionEmpresa)
                        //!/^([a-zA-Z0-9]\s\-\,\:\;\_\(\)\'\".\´\`\á\é\í\ó\ú\ü)+{3,150}$/gi.test(values.direccionEmpresa)
                        !/^([a-z0-9\s\-#.':;,\´\`áéíóúü()]){3,150}$/gi.test(values.direccionEmpresa)
                    ) {
                        errors.direccionEmpresa = 'La dirección no debe tener símbolos inválidos y debe ser entre 3 y 150 caracteres.';
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
                
                <form onSubmit={handleSubmit} className='col-12 col-lg-6'>

                    {/**
                     * INPUT-EMAIL
                     * Correo Electrónico
                    */}
                    <div className='form-group text-left'>
                        <label htmlFor='inputEmail'>Correo electrónico</label>
                        <input
                            className='form-control'
                            id="inputEmail"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        <small className='form-text text-muted'>El correo con el que está registrada su cuenta de Venka o con el que desea registrar una nueva</small>
                    { errors.email && initialTouched.email && errors.email }
                    </div>

                    {/**
                     * INPUT-TEXT
                     * Nombre Empresa
                    */}
                    <div className='form-group text-left'>
                        <label htmlFor='inputNombreEmpresa'>Nombre de la Empresa o Sucursal</label>
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

                    {/**
                     * INPUT-NUMBER X 2
                     */}
                    <div className='form-group text-left d-flex justify-content-around'>
                        <div>
                            <label htmlFor='inputMesas'>Mesas</label>
                            <input
                                id='inputMesas'
                                className='form-control'
                                name='inputMesas'
                                type='number'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.mesas}
                            />
                            <small className=''></small>
                        </div>
                        <div>
                            elemento 2
                        </div>
                    </div>

                    <button className='btn btn-primary' disabled={isSubmitting} onKeyDown={handleSubmit}>
                        Enviar
                    </button>

                </form>

            ) }
            
            </Formik>
        </div>
    )
}

export default Body