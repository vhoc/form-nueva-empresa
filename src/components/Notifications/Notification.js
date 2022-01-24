import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const Notification = ({ notification }) => {

    const [show, setShow] = useState(true)
    /*
    return(
        <div className={`alert alert-${notification.type} alert-dismissible fade show w-100`} role="alert">
            {notification.message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )*/

    return (
        <div className={`alert alert-${notification.type} alert-dismissible fade show w-100`} role="alert">
            <Alert show={show} variant='warning'>
                <div className='d-flex justify-content-between'>
                    <p>Test {notification.message}</p>
                    <Button onClick={() => setShow(false)} variant="outline-warning">
                        X
                    </Button>
                </div>
            </Alert>
        </div>
    )
}

export default Notification