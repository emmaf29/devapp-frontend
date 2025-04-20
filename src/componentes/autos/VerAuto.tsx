import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiClient from '../../ApiClient';
import { Auto } from '../../modelo/Auto';

const VerAuto = () => {
  const { id } = useParams<{ id: string }>();
  const [auto, setAuto] = useState<Auto | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAuto = async () => {
      try {
        const response = await apiClient.get<Auto>(`/autos/${id}`);
        console.log("Auto recibido:", response.data); //
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
    <div>
      <h2>Detalles del Auto</h2>
      {error && <p>{error}</p>}
      {!auto ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <p>Patente: {auto.patente}</p>
          <p>Marca: {auto.marca}</p>
          <p>Modelo: {auto.modelo}</p>
          <p>Año: {auto.anio}</p>
          
        </div>
      )}
    </div>
  );
};

export default VerAuto;
