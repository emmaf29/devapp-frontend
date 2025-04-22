import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiClient from '../../ApiClient';
import { Auto } from '../../modelo/Auto';
import "./css/Verautos.css"


const VerAuto = () => {
  const { id } = useParams();
  const [autos, setAutos] = useState<Auto[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const response = await apiClient.get<Auto[]>(`/autos/${id}`);
        console.log("Autos recibidos:", response.data);
        setAutos(response.data);
      } catch (err) {
        setError("No se pudo obtener los autos.");
      }
    };
  
    if (id) {
      fetchAutos();
    }
  }, [id]);
  
  return (
    <div className="contenedor-auto">
      <h2 className="titulo-auto">Autos del Dueño #{id}</h2>
      {error && <p>{error}</p>}
      {!autos.length ? (
        <p>No hay autos para mostrar.</p>
      ) : (
        autos.map((auto) => (
          <div key={auto.idAuto} className="campos-auto">
            <p>Patente: {auto.patente}</p>
            <p>Marca: {auto.marca}</p>
            <p>Modelo: {auto.modelo}</p>
            <p>Año: {auto.anio}</p>
            <p>Color: {auto.color}</p>
            <p>Motor: {auto.motor}</p>
            <p>Número de chasis: {auto.numeroDeChasis}</p>
          </div>
        ))
      )}
    </div>
  );
};
export default VerAuto;
