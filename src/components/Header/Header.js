import { useEffect, useState } from 'react'
import './Header.css'

const Header = ({ title, description }) => {

  const [user, setUser] = useState({ userName: '', userEmail: '' })

  useEffect( () => {
    setUser( { userName: localStorage.getItem('userName'), userEmail: localStorage.getItem('userEmail') } )
  }, [localStorage.length])


    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container text-white text-left py-5">
                <h1 className="display-4 text-left text-uppercase">{title}</h1>
                <p className="lead text-right">Panel de Usuario{ (user.userName && user.userEmail ) && ` de ${ user.userName } (${user.userEmail})` }</p>
                <p className='small'>{description}</p>
            </div>
        </div>
    )

}

export default Header