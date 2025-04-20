import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './componentes/home';
import ListaPersonas from './componentes/personas/ListaPersona';
import ListaAutos from './componentes/autos/ListaAutos';
import VerPersona from './componentes/personas/VerPersona';
import VerAuto from './componentes/autos/VerAuto';
import AgregarPersona from './componentes/personas/AgregarPersona';
import EditarPersona from './componentes/personas/EditarPersona';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personas" element={<ListaPersonas />} />
        <Route path="/autos" element={<ListaAutos />} />
        <Route path="/persona/:id" element={<VerPersona />} />
        <Route path="/autos/:id" element={<VerAuto />} />
        <Route path="/agregar" element={<AgregarPersona />} />
        <Route path="/persona/:id/editar" element={<EditarPersona />} />

      </Routes>
    </Router>
  );
};

export default App;
