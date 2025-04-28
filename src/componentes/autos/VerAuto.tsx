// src/componentes/VerAuto.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiClient from '../../ApiClient';
import { Auto } from '../../modelo/Auto';
import "./css/Verautos.css";

const VerAuto = () => {
  const { id } = useParams(); 
  const [auto, setAuto] = useState<Auto | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAuto = async () => {
      try {
        const response = await apiClient.get<Auto>(`/autos/${id}`);
        setAuto(response.data);
      } catch (err) {
        setError("No se pudo obtener el auto.");
      }
    };

    if (id) {
      fetchAuto();
    }
  }, [id]);

  return (
    <div className="contenedor-auto">
      <h2 className="titulo-auto">Detalles del Auto #{id}</h2>
      {error && <p>{error}</p>}
      {!auto ? (
        <p>Cargando...</p>
      ) : (
        <div className="campos-auto">
          <p>Patente: {auto.patente}</p>
          <p>Marca: {auto.marca}</p>
          <p>Modelo: {auto.modelo}</p>
          <p>Año: {auto.anio}</p>
          <p>Color: {auto.color}</p>
          <p>Motor: {auto.motor}</p>
          <p>Número de chasis: {auto.numeroDeChasis}</p>
        </div>
      )}
    </div>
  );
};

export default VerAuto;
