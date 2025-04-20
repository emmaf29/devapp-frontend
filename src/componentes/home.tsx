import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bienvenido</h1>
      <button onClick={() => navigate('/personas')}>Personas</button>
      <button onClick={() => navigate('/autos')}>Autos</button>
    </div>
  );
};

export default Home;
