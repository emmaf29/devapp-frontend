type Props = {
    persona: {
      nombre: string;
      apellido: string;
      dni: string;
      fechaDeNacimiento: string;
      genero: string;
      esDonante: boolean;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
  };
  
  const FormularioPersona = ({ persona, onChange, onSubmit }: Props) => {
    return (
      <form onSubmit={onSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={persona.nombre}
            onChange={onChange}
            required
          />
        </label>
        <br />
        <label>
          Apellido:
          <input
            type="text"
            name="apellido"
            value={persona.apellido}
            onChange={onChange}
            required
          />
        </label>
        <br />
        <label>
          DNI:
          <input
            type="text"
            name="dni"
            value={persona.dni}
            onChange={onChange}
            required
          />
        </label>
        <br />
        <label>
          Fecha de Nacimiento:
          <input
            type="date"
            name="fechaDeNacimiento"
            value={persona.fechaDeNacimiento}
            onChange={onChange}
            required
          />
        </label>
        <br />
        <label>
          Género:
          <select
            name="genero"
            value={persona.genero}
            onChange={onChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMENINO">Femenino</option>
            <option value="NO-BINARIO">No Binario</option>
          </select>
        </label>
        <br />
        <label>
          Donante de órganos:
          <input
            type="checkbox"
            name="esDonante"
            checked={persona.esDonante}
            onChange={onChange}
          />
        </label>
        <br />
      </form>
    );
  };
  
  export default FormularioPersona;
  