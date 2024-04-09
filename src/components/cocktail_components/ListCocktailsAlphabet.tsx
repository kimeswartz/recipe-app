import "../../styling/CocktailAlphabetStyle.css";
import { useState, useEffect } from "react";
import globalCocktailFunctions from "../../store/CocktailAPICalls";

const ListCocktailsAlphabet = () => {

  const { fetchCocktailsByLetter, emptyCocktailList } = globalCocktailFunctions();
  const [selectedLetter, setSelectedLetter] = useState('');

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleSelectLetter = (letter: string) => {
    setSelectedLetter(letter);
    fetchCocktailsByLetter(letter)
  }

  useEffect(() => {
    emptyCocktailList();
  }, [])

  return (
    <section className="standard-container">
    <div>
      <div className="spacer-container">
      <h2>Cocktails by the letter {selectedLetter} </h2>
      </div>
      <div className="alphabet-container">
        {alphabet.map((letter: string, index) => (
          <div key={index} className="alphabet-letter" onClick={() => handleSelectLetter(letter)}>
            <a >{letter}</a>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default ListCocktailsAlphabet;