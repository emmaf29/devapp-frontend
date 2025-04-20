import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../ApiClient";
import { Auto } from "../../modelo/Auto"; 

const VerPersona = () => {
  const { id } = useParams<{ id: string }>();
  const [persona, setPersona] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const VERPERSON = `/personas/${id}`;

  const obtenerPersona = async () => {
    try {
      const response = await apiClient.get(VERPERSON);
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
    <div>
      {error && <p>{error}</p>}
      {persona ? (
        <div>
          <h2>Detalles de la Persona</h2>
          <p>Nombre: {persona.nombre} {persona.apellido}</p>
          <p>Fecha de Nacimiento: {new Date(persona.fechaDeNacimiento).toLocaleDateString()}</p>
          <p>Género: {persona.genero}</p>
          <p>Es Donante: {persona.esDonante ? "Sí" : "No"}</p>

          <h3>Autos</h3>
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
              {persona.autos.length > 0 ? (
                persona.autos.map((auto: Auto) => (
                  <tr key={auto.id}>
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
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default VerPersona;
