import "../personas/css/FormularioPersona.css" 
import { BotonCancelar } from '../personas/botones/BotonCancelar';
import { BotonConfirmar } from '../personas/botones/BotonConfirmar';
import { Auto } from '../../modelo/Auto';

type Props = {
  auto: Auto;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string;
};

const FormularioAuto = ({ auto, onChange, onSubmit, error }: Props) => {
  return (
    <form onSubmit={onSubmit} className="formulario">
      <label>
        ID Dueño:
        <input
          name="idDuenio"
          value={auto.idDuenio}
          onChange={onChange}
          required
        />
      </label>
      <br />

      <label>
        Marca:
        <input
          type="text"
          name="marca"
          value={auto.marca}
          onChange={onChange}
          required
        />
      </label>
      <br />

      <label>
        Modelo:
        <input
          type="text"
          name="modelo"
          value={auto.modelo}
          onChange={onChange}
          required
        />
      </label>
      <br />

      <label>
        Año:
        <input
          type="number"
          name="anio"
          value={auto.anio}
          onChange={onChange}
          required
        />
      </label>
      <br />

      <label>
        Patente:
        <input
          type="text"
          name="patente"
          value={auto.patente}
          onChange={onChange}
          required
        />
      </label>
      <br />

      <label>
        Color:
        <input
          type="text"
          name="color"
          value={auto.color}
          onChange={onChange}
          required
        />
      </label>
      <br />

      <label>
        Número de Chasis:
        <input
          type="text"
          name="numeroDeChasis"
          value={auto.numeroDeChasis}
          onChange={onChange}
          required
        />
      </label>
      <br />

      <label>
        Motor:
        <input
          type="text"
          name="motor"
          value={auto.motor}
          onChange={onChange}
          required
        />
      </label>
      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: '1rem' }}>
        <BotonConfirmar />
        <span style={{ marginLeft: '1rem' }} />
        <BotonCancelar />
      </div>
    </form>
  );
};

export default FormularioAuto;
