import './App.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';

function App() {
  return (
    <div className="App">
      <Header
        title="Venka"
        subtitle="Registro de Nueva Cuenta y Empresa."
      />
      <Body/>
    </div>
  );
}

export default App;
