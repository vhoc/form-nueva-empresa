import './Header.css'

const Header = ({ title }) => {

    return (
        <div className="jumbotron jumbotron-fluid d-flex align-items-center px-0">
            <div className="container-fluid d-flex align-items-center justify-content-between text-white text-left py-2 gap-3">
                <p className="lead text-right">Mi Cuenta</p>
                <h1 className="display-4 text-left text-uppercase">{title}</h1>
                <span></span>
            </div>
        </div>
    )

}

export default Header