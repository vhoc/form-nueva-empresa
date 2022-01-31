import BarraTitulo from "../../components/BarraTitulo/BarraTitulo"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../../components/Loading"
import { Formik, Field } from 'formik'
import Swal from "sweetalert2"

const Usuario = () => {

    const location = useLocation()
    const userId = location.state.id
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState( true )

    useEffect( () => {

        const getUser = async ( id ) => {

            try {
                const response = await axios.get( `https://venka.app/api/usuario/${ id }`, {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Accept': 'application/json'
                    }
                } )

                setUser( await response.data )
                setIsLoading( false )
            }
            catch ( error ) {
                console.log(error)
            }

        }

        getUser( userId )

    }, [userId] )

    return (

        <div className="container-fluid d-flex flex-column align-items-center p-0">

            <BarraTitulo titulo="Opciones de Usuario" linkButton={'/'} linkButtonIcon={faHome} />

            <div className='d-flex justify-content-center p-5 w-100'>
            {
                ! isLoading ?
                <div className="d-flex flex-column align-items-center w-100">

                    <Formik
                        enableReinitialize

                        initialValues={
                            {
                                name: user.name,
                                email: user.email
                            }
                        }

                        validate={ values => {
                            const errors = {};    
                            
                            if ( !/^([a-záéíóú'´üñ]|\s){3,50}$/i.test(values.name) ) {
                                errors.name = 'Se permiten de 3 a 50 caracteres, únicamente letras y espacios.';
                            }

                            if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
                                errors.email = 'El correo tiene un formato inválido.';
                            }
                                return errors;
                            }
                            
                        }

                        onSubmit={ (values, {setSubmitting}) => {
                            setSubmitting(true)
                            axios.defaults.withCredentials = true;

                            axios.get('https://venka.app/sanctum/csrf-cookie').then( () => {
                                axios.post('https://venka.app/api/usuario/', values, {
                                    headers: {
                                        xsrfHeaderName: "X-XSRF-TOKEN",
                                        'Authorization': localStorage.getItem('token'),
                                        'Accept': 'application/json'
                                    }
                                    
                                }).then( response => {
                                    if (response.data.error) {
                                        console.warn(response.data.error)
                                        setSubmitting(false)
                                        Swal.fire('Error', 'Hubo un error al intentar guardar los cambios', 'error')
                                    } else {                                    
                                        console.log('success')
                                        setSubmitting(false)
                                        Swal.fire('Guardado', 'Los cambios han sido guardados en la usuario', 'success')
                                    }
                                } )
                            } )

                            
                        }}

                    >

                    { ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (

                        <form onSubmit={handleSubmit} className='col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 text-center'>

                            {/**
                             * INPUT-TEXT
                             * Nombre
                            */}
                            <div className='form-group text-left mb-3'>
                                <label htmlFor='inputName'>Nombre y Apellido(s) <span className='text-red'>*</span></label>
                                <input
                                    required
                                    className='form-control'
                                    id="inputName"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder='Su nombre y apellidos.'
                                />
                                <small className='form-text text-red'>{ errors.nomcom_emp && touched.nomcom_emp && errors.nomcom_emp }</small>
                                <br />
                            </div>

                            {/**
                             * INPUT-EMAIL
                             * Email
                            */}
                            <div className='form-group text-left mb-3'>
                                <label htmlFor='inputEmail'>E-mail<span className='text-red'>*</span></label>
                                <Field
                                    required
                                    className='form-control'
                                    id="inputEmail"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder='Su nombre y apellidos.'
                                />
                                <small className='form-text text-red'>{ errors.nomcom_emp && touched.nomcom_emp && errors.nomcom_emp }</small>
                                <br />
                            </div>

                            <button className='btn btn-primary my-3' disabled={isSubmitting} type='submit'>
                                Enviar
                            </button>

                        </form>
                    ) }

                    </Formik>

                    <hr className="m-5 border"/>
                    <h3>Cambio de Contraseña</h3>

                    <Formik
                        enableReinitialize

                        initialValues={
                            {
                                password: '',
                                confirm_password: ''
                            }
                        }

                        onSubmit={ (values, {setSubmitting}) => {
                            setSubmitting(true)
                            axios.defaults.withCredentials = true;

                            axios.get('https://venka.app/sanctum/csrf-cookie').then( () => {
                                axios.post('https://venka.app/api/usuario/', values, {
                                    headers: {
                                        xsrfHeaderName: "X-XSRF-TOKEN",
                                        'Authorization': localStorage.getItem('token'),
                                        'Accept': 'application/json'
                                    }
                                    
                                }).then( response => {
                                    if (response.data.error) {
                                        console.warn(response.data.error)
                                        setSubmitting(false)
                                        Swal.fire('Error', 'Hubo un error al intentar guardar los cambios', 'error')
                                    } else {                                    
                                        console.log('success')
                                        setSubmitting(false)
                                        Swal.fire('Guardado', 'Los cambios han sido guardados en la usuario', 'success')
                                    }
                                } )
                            } )

                            
                        }}

                    >

                    { ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (

                        <form onSubmit={handleSubmit} className='col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 text-center'>

                            {/**
                             * INPUT-TEXT
                             * Nombre
                            */}
                            <div className='form-group text-left'>
                                <label htmlFor='inputName'>Nueva Contraseña</label>
                                <input
                                    required
                                    className='form-control'
                                    id="inputPassword"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    
                                    
                                />
                                
                                <br />
                            </div>

                            {/**
                             * INPUT-EMAIL
                             * Email
                            */}
                            <div className='form-group text-left'>
                                <label htmlFor='inputEmail'>Confirmar Contraseña Nueva</label>
                                <Field
                                    required
                                    className='form-control'
                                    id="inputConfirmPassword"
                                    type="password"
                                    name="confirm_password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    
                                    
                                />
                                
                                <br />
                            </div>

                            <button className='btn btn-primary my-3' disabled={isSubmitting} type='submit'>
                                Cambiar Contraseña
                            </button>

                        </form>
                    ) }

                    </Formik>

                </div>

                :
                    <Loading />
            }
            </div>

        </div>
    )

}

export default Usuario