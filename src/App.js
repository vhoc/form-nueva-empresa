import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { validateAuth } from './Helpers';
import Header from './components/Header/Header';
import Index from './pages/Index';
import LoginForm from './pages/LoginForm';
import NuevaEmpresa from './pages/NuevaEmpresa';
import EditarEmpresa from './pages/EditarEmpresa';
import CentroSoluciones from './pages/CentroSoluciones';
import Suscripciones from './pages/Suscripciones/Suscripciones';
import Soporte from './pages/Soporte/Soporte';

function App() {

  return (
    <div className="App">
      <Header
        title="Venka"
        description="Bienvenido, aquí podrá ver y administrar sus empresas, así como renovar la suscripción de cada una de ellas."
      />

      <Routes>

        <Route path="/" element={
          <RequireAuth redirectTo="/login">
            <Index/>
          </RequireAuth>
        }/>
        
        <Route path="login" element={ <LoginForm redirectTo="/" redirectRoute="/" /> } />

        <Route path="nueva-empresa" element={ 
          <RequireAuth redirectTo="/login">
            <NuevaEmpresa/>
          </RequireAuth>
         }
        />

        <Route path="editar-empresa" element={
          <RequireAuth redirectTo="/login">
            <EditarEmpresa/>
          </RequireAuth>
        }
        />

        <Route path="soluciones" element={
          <RequireAuth redirectTo="/login">
            <CentroSoluciones/>
          </RequireAuth>
        }
        />

        <Route path="suscripciones" element={
          <RequireAuth redirectTo="/login">
            <Suscripciones/>
          </RequireAuth>
        }
        />

        <Route path="soporte" element={
          <RequireAuth redirectTo="/login">
            <Soporte/>
          </RequireAuth>
        }
        />

      </Routes>
    </div>
  );
}

const RequireAuth = ({children, redirectTo}) => {
  let isAuthenticated = validateAuth()
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

export default App;
