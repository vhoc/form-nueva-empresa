import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Formik, Field } from 'formik'
import BarraTitulo from '../components/BarraTitulo/BarraTitulo'
import { faHome } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import './EditarEmpresa.css'

const EditarEmpresa = () => {

    // useLocation es para recibir un parámetro desde otro componente enviado por useNavigate.
    const location = useLocation()
    const idEmpresa = location.state.id
    const [isLoading, setIsLoading] = useState( true )
    const [empresa, setEmpresa] = useState({})

    /**
     * Handlers para el cambio de Logo
     */
    const onLogoChange = event => {
        const uri = `https://venka.app/api/empresa/set-logo-img`
        const file = event.target.files[0]
        uploadFile( uri, file )
    }

    const uploadFile = ( uri, file ) => {
        const formData = new FormData()
        formData.append( 'file', file )
        formData.append( 'id_empresa', idEmpresa )
        axios.post(uri, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('token'),
            },
        }).then( (response) => {
           console.log(response) 
        } ).catch( error => {
            console.error(error)
        } )
    }

    useEffect( () => {
        const getEmpresa = async ( id ) => {
            try {
                const response = await axios.get(`https://venka.app/api/empresa/${id}`, {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Accept': 'application/json',
                    }
                })
                setEmpresa( await response.data )
                
    
            } catch ( error ) {
                
                console.log(error)
            }
        }

        getEmpresa( idEmpresa )
        setIsLoading( false )

    }, [isLoading] )

    return (
        <div className="container-fluid d-flex flex-column align-items-center p-0">

        <BarraTitulo titulo={ `Empresa: ${empresa.nomcom_emp || 'cargando...'}` } linkButton={'/'} linkButtonIcon={faHome} />

            <div className='d-flex justify-content-center p-5 w-100'>

                {isLoading ? (<div>Cargando...</div>) : 
                    
                    <Formik

                    enableReinitialize

                    initialValues={
                        
                        {
                            nomcom_emp: empresa.nomcom_emp || '',
                            dircom_emp: empresa.dircom_emp || '',
                            mesas_qty: empresa.mesas_qty || 0,
                            pax_qty: empresa.pax_qty || 0,
                            logo_sucursal: empresa.logo_sucursal || '',
                            nomfis_emp: empresa.nomfis_emp || '',
                            dirfis_emp: empresa.dirfis_emp || '',
                            rfc_emp: empresa.rfc_emp || '',
                        }
                        //empresa || {}
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

                        // Tiene Mesas? has_mesas

                        // Nombre Fiscal nomnomfis_emp
                        if (
                            !/^([a-z]|\d|\s){3,50}$/i.test(values.nomfis_emp)
                        ) {
                            errors.nomfis_emp = 'Se permiten de 3 a 50 caracteres, únicamente letras, números y espacios.';
                        }

                        // Direccion Fiscal dirfis_emp
                        if (
                            !/^([a-z0-9\s\-#.':;,´`áéíóúü()]){3,150}$/gi.test(values.dirfis_emp)
                        ) {
                            errors.dirfis_emp = 'La dirección no debe tener símbolos inválidos y debe ser entre 3 y 150 caracteres.';
                        }

                        // RFC rfc_emp
                        if (
                            !/[A-Z,Ñ,&]{3,4}[0-9]{2}[0,1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?/gi.test(values.rfc_emp)
                        ) {
                            errors.rfc_emp = 'El RFC no tiene un formato válido, no introduzca guiones, símbolos ni espacios.';
                        }

                        // Logo Sucursal logo_sucursal

                        return errors;
                    }}

                    onSubmit={ (values, {setSubmitting}) => {
                        axios.defaults.withCredentials = true;

                        axios.get('https://venka.app/sanctum/csrf-cookie').then( () => {
                            axios.post('https://venka.app/api/nueva-empresa/', values, {
                                xsrfHeaderName: "X-XSRF-TOKEN"
                            }).then( response => {
                                if (response.data.error) {
                                    console.warn(response.data.error)
                                } else {
                                    console.log('success')
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

                        {/**
                         * FIELD - FILE
                         * Imagen, logotipo de sucursal.
                         */}
                        <div className="form-group text-left d-flex flex-wrap justify-content-between align-items-center">
                            <label htmlFor="inputLogo">Logotipo</label>
                            <input
                                className="form-control"
                                id="inputLogo"
                                type="file"
                                accept="image/png, image/jpg, image/jpeg, image/webp"
                                onChange={onLogoChange}
                            />
                            <img className="img img-fluid img-logo" src={`https://venka.app/storage/${empresa.logo_sucursal}`} />
                        </div>

                        <hr />
                        <h4>Datos de Facturación</h4>

                        {/**
                         * INPUT-TEXT
                         * Nombre Fiscal (Razón Social)
                        */}
                        <div className='form-group text-left mb-3'>
                            <label htmlFor='inputNombreFiscal'>Razón Social<span className='text-red'></span></label>
                            <input
                                className='form-control'
                                id="inputNombreFiscal"
                                type="text"
                                name="nomfis_emp"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nomfis_emp}
                                placeholder='Nombre fiscal de su empresa. Razón Social de persona física o sociedad.'
                            />
                            <small className='form-text text-red'>{ errors.nomfis_emp && touched.nomfis_emp && errors.nomfis_emp }</small>
                            <br />
                        </div>

                        {/**
                         * INPUT-TEXT
                         * RFC
                        */}
                        <div className='form-group text-left mb-3'>
                            <label htmlFor='inputRfc'>RFC<span className='text-red'></span></label>
                            <input
                                className='form-control'
                                id="inputRfc"
                                type="text"
                                name="rfc_emp"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.rfc_emp}
                                placeholder='Registro Federal de Contribuyente'
                            />
                            <small className='form-text text-red'>{ errors.rfc_emp && touched.rfc_emp && errors.rfc_emp }</small>
                            <br />
                        </div>

                        {/**
                         * FIELD - TEXTAREA
                         * Dirección Fiscal.
                         */}
                        <div className='form-group text-left'>
                            <label htmlFor='inputDireccionFiscal'>Dirección Fiscal</label>
                            <Field
                                className='form-control'
                                id="inputDireccionFiscal"
                                name="dirfis_emp"
                                component="textarea"
                                rows="4"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dirfis_emp}
                                placeholder='Calle, Número, Colonia, Código Postal, Ciudad y Estado.'
                            ></Field>
                            <small className='form-text text-red'>{ errors.dirfis_emp && touched.dirfis_emp && errors.dirfis_emp }</small>
                        </div>

                        {/* Tiene Mesas? has_mesas
                        // Status status_emp

                        
                        // Logo Sucursal logo_sucursal*/}

                        <button className='btn btn-primary my-3' disabled={isSubmitting} type='submit'>
                            Enviar
                        </button>

                    </form>

                    ) }

                    </Formik>
                
                }
            
                
            </div>
        </div>
    )

}

export default EditarEmpresa