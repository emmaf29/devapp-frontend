import { useEffect, useState } from "react";
import apiClient from "../../ApiClient";
import { Auto } from "../../modelo/Auto";
import { useNavigate } from "react-router-dom";

const ListaAutos = () => {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const obtenerAutos = async () => {
    try {
      const response = await apiClient.get<Auto[]>("/autos"); 
      setAutos(response.data);
    } catch (err) {
      setError("Error al obtener los autos");
    }
  };

  useEffect(() => {
    obtenerAutos();
  }, []);

  const handleVerAuto = (id: number) => {
    navigate(`/autos/${id}`);
  };
  

  return (
    <div className="contenedor-personas">
    <h2>Autos</h2>
  
    {error && <p className="error">{error}</p>}
  
    {autos.length === 0 ? (
      <p>No hay autos disponibles.</p>
    ) : (
      <table className="tabla-personas">
        <thead>
          <tr>
            <th>Patente</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autos.map((auto) => (
            <tr key={auto.id}>
              <td>{auto.patente}</td>
              <td>{auto.marca}</td>
              <td>{auto.modelo}</td>
              <td>{auto.anio}</td>
              <td>
                <button className="btn-ver" onClick={() => handleVerAuto(auto.id)}>Ver</button>
                <button className="btn-editar">Editar</button>
                <button className="btn-borrar">Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  
  );
};

export default ListaAutos;
