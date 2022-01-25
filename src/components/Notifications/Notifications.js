import { useEffect, useState } from 'react'
import axios from "axios"
import Notification from './Notification'

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

    }, [idEmpresa] )

    if ( notifications ) {
        return (
            <>
            {
                Object.keys(notifications).map( (notification) => {
                    return <Notification key={notification} notification={notifications[notification]} idEmpresa={idEmpresa}/>
                })
            }
            </>
        )
    } else {
        return(
            <><div>(Debug) No hay notificaciones.</div></>
        )
    }

}

export default Notifications