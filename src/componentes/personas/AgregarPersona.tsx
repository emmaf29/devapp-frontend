import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormularioPersona from "./formularios/FormularioPersonas";
import apiClient from "../../ApiClient";

const AgregarPersona = () => {
  const navigate = useNavigate();
  const AGREGAR_PERSONA = "/persona";

  const [persona, setPersona] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaDeNacimiento: "",
    genero: "",
    esDonante: false
  });

  const [error, setError] = useState("");
  const [agregada, setAgregada] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setPersona((prev) => ({ ...prev, [name]: checked }));
    } else {
      setPersona((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const personaAEnviar = {
        ...persona,
        fechaDeNacimiento: new Date(persona.fechaDeNacimiento),
        genero: persona.genero as "MASCULINO" | "FEMENINO" | "NO-BINARIO",
        autos: [],
        id: 0
      };

      await apiClient.post(AGREGAR_PERSONA, personaAEnviar);
      setAgregada(true);
      navigate("/personas");
    } catch (err: any) {
      if (!err?.response) {
        setError("Error al agregar persona.");
      } else if (err.response?.status === 400) {
        setError("Los datos son incorrectos o incompletos.");
      } else {
        setError("Error desconocido.");
      }
    }
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <div className="contenedor-formulario">
      <h2>Agregar Persona</h2>

      <FormularioPersona
        persona={persona}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleSubmit}>Agregar</button>
        <button onClick={handleCancel} style={{ marginLeft: '1rem' }}>
          Cancelar
        </button>
      </div>

      {agregada && <p style={{ color: "green" }}>Persona agregada correctamente.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AgregarPersona;
