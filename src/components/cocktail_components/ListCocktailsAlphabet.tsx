import "../../styling/CocktailAlphabetStyle.css";
import { useState } from "react";
import globalCocktailFunctions from "../../store/CocktailAPICalls";

const ListCocktailsAlphabet = () => {

  const { fetchCocktailsByLetter } = globalCocktailFunctions();
  const [selectedLetter, setSelectedLetter] = useState('');

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleSelectLetter = (letter: string) => {
    setSelectedLetter(letter);
    fetchCocktailsByLetter(letter)
  }

  return (
    <div>
      <h2>Cocktails by the letter {selectedLetter} </h2>
      <div className="alphabet-container">
      {alphabet.map((letter: string, index) => (
        <div key={index} className="alphabet-letter" onClick={() => handleSelectLetter(letter)}>
          <a >{letter}</a>
        </div>
      ))}
    </div>
    </div>
    
  );
};

export default ListCocktailsAlphabet;