import './Header.css'

const Header = ({ title, description }) => {

    return (
        <div className="jumbotron jumbotron-fluid d-flex align-items-center px-0">
            <div className="container-fluid d-flex align-items-center text-white text-left py-2 gap-3">
                <h1 className="display-4 text-left text-uppercase">{title}</h1>
                <p className="lead text-right">Mi Cuenta</p>
            </div>
        </div>
    )

}

export default Header