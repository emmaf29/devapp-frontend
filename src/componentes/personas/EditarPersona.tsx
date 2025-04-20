import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormularioEditarPersona from "./formularios/FormularioEditarPersona";
import apiClient from "../../ApiClient";
import { Persona } from "../../modelo/Persona";

const EditarPersona = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [persona, setPersona] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaDeNacimiento: "",
    genero: "",
    esDonante: false
  });

  const [autos, setAutos] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const res = await apiClient.get(`/personas/${id}`); // ✅ Ruta corregida
        const personaData = res.data as Persona;

        setPersona({
          nombre: personaData.nombre,
          apellido: personaData.apellido,
          dni: personaData.dni,
          fechaDeNacimiento: new Date(personaData.fechaDeNacimiento).toISOString().slice(0, 10),
          genero: personaData.genero,
          esDonante: personaData.esDonante
        });

        setAutos(personaData.autos || []);
      } catch (err) {
        console.error("Error al cargar persona:", err);
        setError("No se pudo cargar la persona.");
      }
    };

    fetchPersona();
  }, [id]);

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
        fechaDeNacimiento: new Date(persona.fechaDeNacimiento).toISOString(),
        autos
      };

      await apiClient.put(`/persona/${id}`, personaAEnviar); // ✅ PUT con id
      navigate("/personas");
    } catch (err) {
      console.error("Error al actualizar persona:", err);
      setError("Error al actualizar.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="contenedor-formulario">
      <h2>Editar Persona</h2>

      <FormularioEditarPersona
        persona={persona}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <div>
        <h3>Autos</h3>
        {autos.length === 0 ? (
          <p>No tiene autos.</p>
        ) : (
          <ul>
            {autos.map((auto, idx) => (
              <li key={idx}>
                {auto.modelo} - {auto.patente}
              </li>
            ))}
          </ul>
        )}
        <button disabled>Agregar nuevo auto (deshabilitado en modo edición)</button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleSubmit}>Guardar</button>
        <button onClick={handleCancel} style={{ marginLeft: "1rem" }}>
          Cancelar
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default EditarPersona;
