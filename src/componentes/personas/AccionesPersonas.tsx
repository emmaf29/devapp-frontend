import React from "react";
import { useNavigate } from "react-router-dom";
import { Persona } from "../../modelo/Persona";

interface AccionesPersonaProps {
  persona: Persona;
  onVer: (id: number) => void;
  onBorrar: (persona: Persona) => void;
}

const AccionesPersona: React.FC<AccionesPersonaProps> = ({ persona, onVer, onBorrar }) => {
  const navigate = useNavigate();

  return (
    <>
      <button className="btn-ver" onClick={() => onVer(persona.id)}>Ver</button>
      <button className="btn-editar" onClick={() => navigate(`/persona/${persona.id}/editar`)}>Editar</button>
      <button className="btn-borrar" onClick={() => onBorrar(persona)}>Borrar</button>
    </>
  );
};

export default AccionesPersona;
