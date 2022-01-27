import { Link } from 'react-router-dom'
import './SoporteBlock.css'

const SoporteBlock = ( { iconWhatsApp, content, link = '#' } ) => {

    return (

        <a href={link} target="_blank" className="card col-12 col-sm-8 col-md-7 col-lg-6 col-xl-5">

            <div className="row g-0 align-items-center">

                <div className="col-md-3 p-3">
                    <img className="support-icon img-fluid" src={ iconWhatsApp } />
                </div>

                <div className='col-md-9'>
                    <div className='card-body p-3'>
                        <h2>{ content }</h2>
                    </div>
                </div>

            </div>
            
        </a>

    )

}

export default SoporteBlock