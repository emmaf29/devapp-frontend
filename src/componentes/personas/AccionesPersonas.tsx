import React from "react";
import { Persona } from "../../modelo/Persona";

interface AccionesPersonaProps {
  persona: Persona;
  onVer: (id: number) => void;
  onEditar: (id: number) => void;
  onBorrar: (id: number) => void;
}

const AccionesPersona: React.FC<AccionesPersonaProps> = ({ persona, onVer, onEditar, onBorrar }) => {
  return (
    <>
      <button className="btn-ver" onClick={() => onVer(persona.id)}>Ver</button>
      <button className="btn-editar" onClick={() => onEditar(persona.id)}>Editar</button>
      <button className="btn-borrar" onClick={() => onBorrar(persona.id)}>Borrar</button>
    </>
  );
};


export default AccionesPersona;
