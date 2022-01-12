import { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginForm = ( {redirectRoute} ) => {

    const [credentials, setCredentials] = useState({email: '', password: ''})
    const [filledForm, setFilledForm] = useState(false)
    const fieldEmailRef = useRef()
    const fieldPasswordRef = useRef()
    const goTo = useNavigate()

    /**
     * getToken
     */
     const getToken = () => {
        axios.defaults.withCredentials = true;
        axios.get('https://venka.app/sanctum/csrf-cookie').then( () => {
            axios.post('https://venka.app/api/login', credentials, {
                    xsrfHeaderName: "X-XSRF-TOKEN",            
            }).then(response => {
                console.log(response)
                if (response.data.status_code === 400 ) {
                    Swal.fire('Error de Validación', 'Ingrese ambos campos (E-mail y Contraseña) correctamente.', 'error')
                        .then( () => { return } )
                }
                if (response !== null) {
                    localStorage.setItem('token', `Bearer ${response.data.token}`)
                    localStorage.setItem('userId', response.data.user.id)
                    localStorage.setItem('userEmail', response.data.user.email)
                    localStorage.setItem('userName', response.data.user.name)
                    goTo( redirectRoute, {replace: true} )
                }
            }).catch( error => {
                console.log(error)
                if (filledForm && error) {
                    switch (error.response.status) {
                        case 422: Swal.fire("Error", "Se requiere ingresar el usuario y la contraseña correctamente", "error" )
                            break;
                        case 401:
                            Swal.fire("Error", "Se ha ingresado un usuario o contraseña incorrecto(s).", "error")
                            break;
                        default:
                            Swal.fire("Error", `Error: (${error.message})`, "error")
                            break;
                    }
                }
            })
        })
    }

    const onSubmit = event => {
        event.preventDefault()
        getToken()
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
                    />
                </Form.Group>
                
                <Form.Group className='mb-2'>
                    <Form.Control
                        ref={fieldPasswordRef}
                        type={'password'}
                        placeholder={'Contraseña'}
                        onChange={handleInputValues}
                    />
                </Form.Group>

                <Button
                    type='submit'
                    variant='primary'
                    disabled={!filledForm}
                >
                    Ingresar
                </Button>

            </Form>

            </div>
        </div>

    )

}

export default LoginForm