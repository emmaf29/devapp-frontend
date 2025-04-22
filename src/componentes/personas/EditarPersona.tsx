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
    fechaDeNacimiento: new Date(), 
    genero: "",
    esDonante: false
  });

  const [autos, setAutos] = useState<any[]>([]);
  

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const res = await apiClient.get(`/personas/${id}`);
        const personaData = res.data as Persona;

        setPersona({
          nombre: personaData.nombre,
          apellido: personaData.apellido,
          dni: personaData.dni,
          fechaDeNacimiento: new Date(personaData.fechaDeNacimiento), 
          genero: personaData.genero,
          esDonante: personaData.esDonante
        });

        setAutos(personaData.autos || []);
      } catch (err) {
        console.error("Error al cargar persona:", err);
       
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
    } else if (type === "date") {
      setPersona((prev) => ({ ...prev, [name]: new Date(value) }));
    } else {
      setPersona((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const personaAEnviar = {
        ...persona,
        fechaDeNacimiento: persona.fechaDeNacimiento.toISOString(),
        autos
      };

      await apiClient.put(`/persona/${id}`, personaAEnviar);
      navigate("/personas");
    } 
      catch (err) {
      console.error("Error al actualizar persona:", err);
      
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2>Editar Persona</h2>

      <FormularioEditarPersona
        persona={persona}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

<div style={{ marginTop: "2rem" }}>
  <h3>Autos</h3>
  {autos.length === 0 ? (
    <p>No tiene autos.</p>
  ) : (
    <table className="tabla-personas">
      <thead>
        <tr>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Patente</th>
          <th>Año</th>
        </tr>
      </thead>
      <tbody>
        {autos.map((auto, idx) => (
          <tr key={idx}>
            <td>{auto.marca }</td>
            <td>{auto.modelo }</td>
            <td>{auto.patente }</td>
            <td>{auto.anio }</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
   </div>
    </div>
  );
};

export default EditarPersona;
