import { useEffect, useState } from 'react'
import axios from "axios"

const Notifications = ( { idEmpresa } ) => {

    const [notifications, setNotifications] = useState({})

    useEffect( () => {

        // Checks if the Empresa has been installed in the restaurant's server and if it has an active suscription
        const getEmpresaStatus = async ( id ) => {
            try {
                const response = await axios.get(`https://venka.app/api/empresa/${id}/status`, {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Accept': 'application/json',
                    }
                })
                setNotifications( await response.data )
            } catch ( error ) {
                console.log(error)
            }
        }

        getEmpresaStatus( idEmpresa )

    }, [] )


    return (
        <div className='w-100'>
            {
                notifications &&
                Object.keys(notifications).map( (notification) => 
                    <div className={`alert alert-${notifications[notification].type} alert-dismissible fade show w-100`} role="alert">
                        {notifications[notification].message}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                 )
             }
        </div>
    )
}

export default Notifications