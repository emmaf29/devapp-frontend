import { useEffect, useState } from "react";
import apiClient from "../../ApiClient";
import { Persona } from "../../modelo/Persona";
import "../personas/css/ListaPersonas.css";
import { useNavigate } from "react-router-dom";
import AccionesPersona from "./AccionesPersonas";

const ListaPersonas = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const obtenerPersonas = async () => {
    try {
      const response = await apiClient.get<Persona[]>('/persona');
      setPersonas(response.data);
    } catch (err: any) {
      setError('Error al obtener las personas');
    }
  };

  useEffect(() => {
    obtenerPersonas();
  }, []);

  const handleVerPersona = (id: number) => {
    navigate(`/persona/${id}`);
  };
  
  const handleEditarPersona = (id: number) => {
    navigate(`/persona/${id}/editar`);
  };
  
  const handleBorrarPersona = (id: number) => {
    navigate(`/persona/${id}/borrar`);
  };

  return (
    <div className="contenedor-personas">
      <h2>Personas</h2>
      <button className="btn-agregar" onClick={() => navigate("/agregar")}>
        Agregar nueva
      </button>

      {error && <p className="error">{error}</p>}

      {personas.length === 0 ? (
        <p>No hay personas disponibles.</p>
      ) : (
        <table className="tabla-personas">
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona) => (
              <tr key={persona.id}>
                <td>{persona.dni}</td>
                <td>{persona.nombre}</td>
                <td>{persona.apellido}</td>
                <td>
                <AccionesPersona
                persona={persona}
                onVer={handleVerPersona}
                onEditar={handleEditarPersona}
                onBorrar={handleBorrarPersona}
                 />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaPersonas;
