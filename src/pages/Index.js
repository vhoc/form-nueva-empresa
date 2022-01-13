import { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

import { validateStoredUser, logOut, validateToken } from '../Helpers'
import MenuPrincipal from "../components/MenuPrincipal/MenuPrincipal"
import EmpresasTable from "../components/EmpresasTable/EmpresasTable"

const Index = () => {

    return (
        <div className="container-fluid p-0">
            <MenuPrincipal />
            <EmpresasTable />
        </div>
    )
    
}

export default Index