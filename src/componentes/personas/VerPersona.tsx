import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../ApiClient";
import { Persona } from "../../modelo/Persona";
import { Auto } from "../../modelo/Auto";
import "./css/Verpersona.css";


const VerPersona = () => {
  const { id } = useParams();
  const [persona, setPersona] = useState<Persona | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const VER_PERSONA = `/personas/${id}`;

  const obtenerPersona = async () => {
    try {
      const response = await apiClient.get<Persona>(VER_PERSONA);
      setPersona(response.data);
    } catch (err) {
      console.error("Error al obtener la persona:", err);
      setError("No se pudo obtener la persona.");
    }
  };

  useEffect(() => {
    if (id) {
      obtenerPersona();
    }
  }, [id]);

  
  return (
    <div className="contenedor-persona">
      {error && <p>{error}</p>}
      {persona ? (
        <>
          <h2>Detalles de la Persona</h2>
          <div className="campos-persona">
            <p>Nombre: {persona.nombre}</p>
            <p>Apellido: {persona.apellido}</p>
            <p>Fecha de Nacimiento: {new Date(persona.fechaDeNacimiento).toLocaleDateString()}</p>
            <p>Género: {persona.genero}</p>
            <p>Es Donante: {persona.esDonante ? "Sí" : "No"}</p>
          </div>

          <h3 className="titulo-autos">Autos</h3>
          <button
            className="boton-agregar-auto"
            onClick={() => navigate(``)}
          >
            Agregar nuevo
          </button>

          <table className="tabla-autos">
            <thead>
              <tr>
                <th>Patente</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
              </tr>
            </thead>
            <tbody>
              {persona.autos && persona.autos.length > 0 ? (
                persona.autos.map((auto: Auto) => (
                  <tr key={auto.idDuenio}>
                    <td>{auto.patente}</td>
                    <td>{auto.marca}</td>
                    <td>{auto.modelo}</td>
                    <td>{auto.anio}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No tiene autos registrados.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="botones-finales">
            <button
              className="boton-editar"
              onClick={() => navigate(`/persona/${persona.id}/editar`)}
            >
              Editar
            </button>
            <button
              className="boton-borrar"
              onClick={() => navigate(`/persona/${persona.id}/borrar`)}
            >
              Borrar
            </button>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default VerPersona;
