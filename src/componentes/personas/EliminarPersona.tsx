import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../ApiClient";
import { Persona } from "../../modelo/Persona";
import "./css/EliminarPersona.css";

const EliminarPersona = () => {
  const { id } = useParams();
  const [persona, setPersona] = useState<Persona | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPersona = async () => {
      try {
        const response = await apiClient.get(`/personas/${id}`);
        setPersona(response.data as Persona);
      } catch (err) {
        console.error("Error al obtener la persona:", err);
        setError("No se pudo obtener la persona.");
      }
    };

    if (id) {
      obtenerPersona();
    }
  }, [id]);


  const handleConfirmar = async () => {
    try {
      await apiClient.delete(`/persona/${id}`);
      navigate("/personas");
    } 
     catch (err) {
      console.error("Error al eliminar la persona:", err);
      setError("No se pudo eliminar la persona.");
    }
  };

  const handleCancelar = () => {
    navigate(`/persona/${id}`);
  };

  return (
    <div className="pagina-eliminar">
      {error && <p className="error">{error}</p>}
      {persona ? (
        <div className="contenido-eliminar">
          <p>
            ¿Seguro que queres borrar a {persona.nombre}?
          </p>
          <div className="botones">
            <button className="btn-cancelar" onClick={handleCancelar}>
              Cancelar
            </button>
            <button className="btn-confirmar" onClick={handleConfirmar}>
              Confirmar
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default EliminarPersona;
