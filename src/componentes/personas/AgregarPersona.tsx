import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormularioPersona from "./formularios/FormularioPersonas";
import apiClient from "../../ApiClient";

const AgregarPersona = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const AGREGAR_PERSONA = "/persona";

  const [persona, setPersona] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaDeNacimiento:new Date(),
    genero: "",
    esDonante: false
  });

  
 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setPersona((prev) => ({ ...prev, [name]: checked }));
    } 
    else if (type === "date") {
      setPersona((prev) => ({...prev, [name]: new Date(value)  }));
    } 
    else {
      setPersona((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    
    if (
      !persona.nombre.trim() ||
      !persona.apellido.trim() ||
      !persona.dni.trim() ||
      !persona.genero
    ) {
      setError("Todos los campos deben estar completos.");
      return;
    }

    try {
      const personaAEnviar = {
        ...persona,
        fechaDeNacimiento: new Date(persona.fechaDeNacimiento),
        autos: [],
        id: 0,
      };

      await apiClient.post(AGREGAR_PERSONA, personaAEnviar);
      navigate("/personas");
    } catch (err: any) {
      if (!err?.response) {
        setError("Error al agregar persona.");
      } 
      else if (err.response?.status === 400) {
        setError("Los datos son incorrectos o incompletos.");
      } 
      else {
        setError("Error desconocido.");
      }
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2>Agregar Persona</h2>

      <FormularioPersona
        persona={persona}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
      />
    </div>
  );
};
export default AgregarPersona;
