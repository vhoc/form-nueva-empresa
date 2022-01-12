import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Index from './pages/Index';
import LoginForm from './pages/LoginForm';
import NuevaEmpresa from './pages/NuevaEmpresa';

function App() {
  return (
    <div className="App">
      <Header
        title="Venka"
        subtitle="Panel de Usuario"
        description="Bienvenido, aquí podrá ver y administrar sus empresas, así como renovar la suscripción de cada una de ellas."
      />

      <Routes>
        <Route path="/" element={ <Index/> } />
        <Route path="login" element={ <LoginForm redirectRoute="/" /> } />
        <Route path="nueva-empresa" element={ <NuevaEmpresa/> } />
      </Routes>
    </div>
  );
}

export default App;
