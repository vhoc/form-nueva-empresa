import './Header.css'

const Header = ({ title, subtitle, description }) => {

    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container text-white text-left py-5">
                <h1 className="display-4 text-left text-uppercase">{title}</h1>
                <p className="lead text-right">{subtitle}</p>
                <p className='small'>{description}</p>
            </div>
        </div>
    )

}

export default Header