import { useNavigate } from 'react-router-dom';

const ListCocktailsAlphabet = () => {

  const navigate = useNavigate();

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div>
      {alphabet.map((letter: string, index) => (
        <span key={index}>
          <span>
            {index === 0 ? <span></span> : <span>/</span>}
          </span>
          <a onClick={() => navigate(`/cocktails/${letter}`)}>
            {letter}
          </a>
        </span>
      ))}
    </div>
  );
};

export default ListCocktailsAlphabet;