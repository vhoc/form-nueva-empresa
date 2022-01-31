import BarraTitulo from "../../components/BarraTitulo/BarraTitulo"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../../components/Loading"

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

            <h1>
            {
                ! isLoading ?
                    location.state.id
                :
                    <Loading />
            }
            </h1>

        </div>
    )

}

export default Usuario