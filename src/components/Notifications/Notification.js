import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Notification = ({ notification, idEmpresa }) => {

    const [show, setShow] = useState(true)
    const redirectTo = useNavigate()

    const solution = ( solutionType ) => {
        if ( solutionType === 'suscription' ) {
            redirectTo( `/soluciones`, {
                state: {
                    solutionType: solutionType,
                    empresaId: idEmpresa
                }
            })
        }

    }

    return (
    
        <Alert show={show} variant={notification.type} className='w-100'>
            <div className='d-flex'>
                <span>{notification.message}</span>
                <Button onClick={() => solution( notification.solution ) } variant={'link'} size="sm" >Solucionar</Button>
                <Button onClick={() => setShow(false)} variant={`outline-${notification.type}`} size="sm" className='ms-auto'>
                    <span>&times;</span>
                </Button>
            </div>
        </Alert>

    )
}

export default Notification