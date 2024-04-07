import { useNavigate } from "react-router-dom";
import "../../styling/CocktailAlphabetStyle.css";

const ListCocktailsAlphabet = () => {
  const navigate = useNavigate();

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="alphabet-container">
      {alphabet.map((letter: string, index) => (
        <div key={index} className="alphabet-letter">
          <a onClick={() => navigate(`/cocktails/${letter}`)}>{letter}</a>
        </div>
      ))}
    </div>
  );
};

export default ListCocktailsAlphabet;