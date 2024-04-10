import "../../styling/CocktailAlphabetStyle.css";
import { useState, useEffect } from "react";
import globalCocktailFunctions from "../../store/CocktailAPICalls";

const ListCocktailsAlphabet = () => {
  const { fetchCocktailsByLetter, emptyCocktailList } =
    globalCocktailFunctions();
  const [selectedLetter, setSelectedLetter] = useState("");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleSelectLetter = (letter: string) => {
    setSelectedLetter(letter);
    fetchCocktailsByLetter(letter);
  };

  useEffect(() => {
    emptyCocktailList();
  }, []);

  return (
    <section className="standard-container">
      <div>
        <div className="spacer-container centered-container">
          <p>
            Find cocktails starting at...<strong> {selectedLetter} </strong>
          </p>
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
      </div>
    </section>
  );
};

export default ListCocktailsAlphabet;
