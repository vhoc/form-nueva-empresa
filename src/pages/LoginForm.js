import { useState, useRef, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { validateAuth } from '../Helpers'

const LoginForm = () => {

    const [credentials, setCredentials] = useState({email: '', password: ''})
    const [filledForm, setFilledForm] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [auth, setAuth] = useState(false)
    const fieldEmailRef = useRef()
    const fieldPasswordRef = useRef()
    const goTo = useNavigate()

    /**
     * doLogin
     */
     const doLogin = () => {
        setIsSending(true)
        axios.defaults.withCredentials = true;
        axios.get('https://venka.app/sanctum/csrf-cookie').then( () => {
            axios.post('https://venka.app/api/login', credentials, {
                    xsrfHeaderName: "X-XSRF-TOKEN",
            }).then(response => {

                if (response.data.status_code === 400 ) {
                    Swal.fire('Error de Validación', 'Ingrese ambos campos (E-mail y Contraseña) correctamente.', 'error')
                        .then(() => setIsSending(false))
                    return
                }

                if (response.data.status_code === 403) {
                    Swal.fire('Error de Autenticación', 'Los datos ingresados no coinciden con los de ningún usuario registrado.', 'error')
                        .then(() => setIsSending(false))
                    return
                }

                if (response.data.status_code === 200 ) {
                    localStorage.setItem('token', `Bearer ${response.data.token}`)
                    localStorage.setItem('userId', response.data.user.id)
                    localStorage.setItem('userEmail', response.data.user.email)
                    localStorage.setItem('userName', response.data.user.name)

                    setAuth(true)
                    setIsSending(false)
                    return
                }
                Swal.fire('Error', 'Hubo un error al intentar ingresar.', 'error')
                setIsSending(false)
                return
                
            }).catch( () => {
                Swal.fire('Error', 'Hubo un error al intentar ingresar, verifique su conexión a internet', 'error')
                setIsSending(false)
                return
            })
        })
    }

    const checkLogin = () => {
        if ( validateAuth() === true ) {
            return true
        } else {
            return false
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        doLogin()
    }


    const handleInputValues = () => {
        if (fieldPasswordRef.current.value && fieldEmailRef.current.value) {
            setCredentials({...credentials,
                email: fieldEmailRef.current.value,
                password: fieldPasswordRef.current.value
           })
            setFilledForm(true)
        } else {
            setFilledForm(false)
        }
    }

    /**
     * DISABLE THIS ENTIRE COMPONENT.
     */
    useEffect( () => {
        window.location.href = "https://venka.app/login"
    } )

    useEffect(() => {
        if ( auth === true ) {
            goTo("/", { replace: true })
        }

        if ( checkLogin() === true ) {
            goTo("/", { replace: true })
        }
    }, [auth])

    return (
        <div className='p-3 col-12 d-flex flex-column justify-content-center align-items-center'>
            <h3>Acceso</h3>
            <div className='col-8 col-md-6 col-lg-4 col-xl-3'>
            <Form onSubmit={onSubmit}>

                <Form.Group className='mb-2'>
                    <Form.Control
                        ref={fieldEmailRef}
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={handleInputValues}
                        autoComplete="on"
                    />
                </Form.Group>
                
                <Form.Group className='mb-2'>
                    <Form.Control
                        ref={fieldPasswordRef}
                        type={'password'}
                        placeholder={'Contraseña'}
                        onChange={handleInputValues}
                        autoComplete="on"
                    />
                </Form.Group>

                <Button
                    type='submit'
                    variant='primary'
                    disabled={!filledForm || isSending}
                >
                    Ingresar
                </Button>

            </Form>

            </div>
        </div>

    )

}

export default LoginForm