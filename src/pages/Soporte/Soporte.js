import BarraTitulo from "../../components/BarraTitulo/BarraTitulo"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import iconWhatsApp from '../../assets/icons/icon-whatsapp.svg'
import iconEmail from '../../assets/icons/icon-email.svg'
import SoporteBlock from "./SoporteBlock"
import './Soporte.css'

const Soporte = () => {

    return (
        <div className="container-fluid d-flex flex-column align-items-center p-0">
        
            <BarraTitulo titulo="Soporte" linkButton={'/'} linkButtonIcon={faHome} />

            <div className='d-flex flex-column align-items-center justify-content-center p-5 w-100 gap-3'>

                <h5>Ponemos a tu disposición los siguientes medios para obtener soporte:</h5>

                <SoporteBlock iconWhatsApp={iconWhatsApp} content="662·607·0036" link="https://web.whatsapp.com/send?phone=526626070036&text&app_absent=0"/>

                <SoporteBlock iconWhatsApp={iconEmail} content="soporte@venka.mx" link="mailto:soporte@venka.mx"/>

            </div>

        </div>
    )

}

export default Soporte