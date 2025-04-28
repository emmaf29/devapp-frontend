import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../ApiClient";
import { Auto } from "../../modelo/Auto";
import "../personas/css/EliminarPersona.css";

const EliminarAuto = () => {
  const { id } = useParams();
  const [auto, setAuto] = useState<Auto | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerAuto = async () => {
      try {
        const response = await apiClient.get(`/autos/${id}`);
        setAuto(response.data as Auto);
      } catch (err) {
        console.error("Error al obtener el auto:", err);
        setError("No se pudo obtener el auto.");
      }
    };

    if (id) {
      obtenerAuto();
    }
  }, [id]);

  const handleConfirmar = async () => {
    try {
      await apiClient.delete(`/autos/${id}`);
      navigate("/autos");
    } catch (err) {
      console.error("Error al eliminar el auto:", err);
      setError("No se pudo eliminar el auto.");
    }
  };

  const handleCancelar = () => {
    navigate(`/autos/${id}`);
  };

  return (
    <div className="pagina-eliminar">
      {error && <p className="error">{error}</p>}
      {auto ? (
        <div className="contenido-eliminar">
          <p>
            ¿Seguro que querés borrar el auto {auto.patente}?
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

export default EliminarAuto;
