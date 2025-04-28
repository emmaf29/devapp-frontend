import { BotonCancelar } from "../personas/botones/BotonCancelar"; 
import { BotonConfirmar } from "../personas/botones/BotonConfirmar";

type Props = {
  auto: {
    marca: string;
    modelo: string;
    anio: number;
    patente: string;
    color: string;
    numeroDeChasis: string;
    motor: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const FormularioEditarAuto = ({ auto, onChange, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className="formulario">
      <label>
        Marca:
        <input type="text" name="marca" value={auto.marca} onChange={onChange} required />
      </label>
      <br />
      <label>
        Modelo:
        <input type="text" name="modelo" value={auto.modelo} onChange={onChange} required />
      </label>
      <br />
      <label>
        Año:
        <input type="number" name="anio" value={auto.anio} onChange={onChange} required />
      </label>
      <br />
      <label>
        Patente:
        <input type="text" name="patente" value={auto.patente} onChange={onChange} required />
      </label>
      <br />
      <label>
        Color:
        <input type="text" name="color" value={auto.color} onChange={onChange} required />
      </label>
      <br />
      <label>
        Número de Chasis:
        <input type="text" name="numeroDeChasis" value={auto.numeroDeChasis} onChange={onChange} required />
      </label>
      <br />
      <label>
        Motor:
        <input type="text" name="motor" value={auto.motor} onChange={onChange} required />
      </label>
      <br />
      <div style={{ marginTop: "1rem" }}>
        <BotonConfirmar />
        <span style={{ marginLeft: "1rem" }} />
        <BotonCancelar />
      </div>
    </form>
  );
};

export default FormularioEditarAuto;
