import React from "react";
import { Persona } from "../../modelo/Persona";
import apiClient from "../../ApiClient";
import "./css/EliminarPersona.css"

interface EliminarPersonaProps { 
  persona: Persona;
  onCancel: () => void;
  onDeleted: (idEliminado: number) => void;
}

const EliminarPersona: React.FC<EliminarPersonaProps> = ({ persona, onCancel, onDeleted }) => {
  
    const handleConfirmar = async () => {
    try {
      await apiClient.delete(`/persona/${persona.id}`);
      onDeleted(persona.id);
    } catch (error) {
      console.error("Error al eliminar persona", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>¿Seguro que querés borrar a <strong>{persona.nombre}</strong>?</p>
        <div className="popup-buttons">
          <button className="btn-cancelar" onClick={onCancel}>Cancelar</button>
          <button className="btn-confirmar" onClick={handleConfirmar}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default EliminarPersona;
