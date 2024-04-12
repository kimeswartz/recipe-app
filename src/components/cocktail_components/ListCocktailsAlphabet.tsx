import "../../styling/CocktailAlphabetStyle.css";
import { useState, useEffect } from "react";
import globalCocktailFunctions from "../../store/CocktailAPICalls";

const ListCocktailsAlphabet = () => {
  const { fetchCocktailsByLetter, emptyCocktailList } =
    globalCocktailFunctions();
  const [selectedLetter, setSelectedLetter] = useState("A");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    fetchCocktailsByLetter("A");
  }, []);

  const handleSelectLetter = (letter: string) => {
    setSelectedLetter(letter);
    fetchCocktailsByLetter(letter);
  };

  useEffect(() => {
    emptyCocktailList();
  }, []);

  return (
    <section className="standard-container">
      <div className="centered-container">
        <h2 className="find-cocktails">
          Find cocktails starting with...<span> {selectedLetter} </span>
        </h2>
      </div>

      <div className="alphabet-container">
        {alphabet.map((letter: string, index) => (
          <div
            key={index}
            className="alphabet-letter"
            onClick={() => handleSelectLetter(letter)}
          >
            <a>{letter}</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListCocktailsAlphabet;
