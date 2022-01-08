import './App.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';

function App() {
  return (
    <div className="App">
      <Header
        title="Venka"
        subtitle="Formulario de Alta de Nueva Empresa o Sucursal"
      />
      <Body/>
    </div>
  );
}

export default App;
