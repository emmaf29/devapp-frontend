import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormularioAuto from "./FormularioAutos";
import apiClient from "../../ApiClient";
import { Auto } from "../../modelo/Auto";

  const AgregarAuto = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const AGREGAR_AUTO = "/auto";

  const [auto, setAuto] = useState<Auto>({
    id: 0,
    idDuenio: 0,
    marca: "",
    modelo: "",
    anio: new Date().getFullYear(),
    patente: "",
    color: "",
    numeroDeChasis: "",
    motor: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setAuto((prev) => ({
      ...prev,
      [name]: name === "anio" || name === "idDuenio" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !auto.marca.trim() ||
      !auto.modelo.trim() ||
      !auto.patente.trim() ||
      !auto.numeroDeChasis.trim() ||
      !auto.motor.trim() ||
      !auto.color.trim() ||
      !auto.anio ||
      !auto.idDuenio
    ) {
      setError("Todos los campos deben estar completos.");
      return;
    }

    try {
      const autoAEnviar = {
        ...auto,
        
      };

      await apiClient.post(AGREGAR_AUTO, autoAEnviar);
      navigate("/autos");
    } catch (err: any) {
      if (!err?.response) {
        setError("Error al agregar auto.");
      } else if (err.response?.status === 400) {
        setError("Los datos son incorrectos o incompletos.");
      } else {
        setError("Error desconocido.");
      }
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2>Agregar Auto</h2>

      <FormularioAuto
        auto={auto}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
      />
    </div>
  );

  };
export default AgregarAuto;
