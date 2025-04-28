import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../ApiClient";
import { Auto } from "../../modelo/Auto";
import FormularioEditarAuto from "./FormularioEditarAuto ";

const EditarAuto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [auto, setAuto] = useState({
    marca: "",
    modelo: "",
    anio: 0,
    patente: "",
    color: "",
    numeroDeChasis: "",
    motor: ""
  });

  useEffect(() => {
    const fetchAuto = async () => {
      try {
        const res = await apiClient.get<Auto>(`/autos/${id}`);
        setAuto(res.data);
      } catch (err) {
        console.error("Error al cargar auto:", err);
      }
    };
  
    fetchAuto();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAuto((prev) => ({
      ...prev,
      [name]: name === "anio" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.put(`/auto/${id}`, auto);
      navigate("/autos");
    } catch (err) {
      console.error("Error al actualizar auto:", err);
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2>Editar Auto</h2>
      <FormularioEditarAuto
        auto={auto}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditarAuto;
