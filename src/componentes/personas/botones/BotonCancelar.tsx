
import { useNavigate } from "react-router-dom";

export const BotonCancelar = () => {
  const navigate = useNavigate();

  return (
    <button type="button" className="btn btn-danger" onClick={() => navigate(-1)}>
      Cancelar
    </button>
  );
};
