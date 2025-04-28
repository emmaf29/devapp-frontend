import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './componentes/home';
import ListaPersonas from './componentes/personas/ListaPersona';
import ListaAutos from './componentes/autos/ListaAutos';
import VerPersona from './componentes/personas/VerPersona';
import VerAuto from './componentes/autos/VerAuto';
import AgregarPersona from './componentes/personas/AgregarPersona';
import EditarPersona from './componentes/personas/EditarPersona';
import EliminarPersona from './componentes/personas/EliminarPersona';
import AgregarAuto from './componentes/autos/AgregarAuto';
import EliminarAuto from './componentes/autos/EliminarAuto';
import EditarAuto from './componentes/autos/EditarAuto';

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
        <Route path="/persona/:id/borrar" element={<EliminarPersona />} />

        <Route path="/autos/:id/borrar" element={<EliminarAuto />} />
        <Route path="/agregarAuto" element={<AgregarAuto />} />
        <Route path="/autos/editar/:id" element={<EditarAuto />} />
      </Routes>
    </Router>
  );
};

export default App;
