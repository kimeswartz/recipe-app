import { useState } from "react";
import globalRecipeFunctions from "../../store/RecipeAPICalls";

const ClearAPIComponent = () => {
  const [dangerButton, setDangerButton] = useState(true);
  const { clearAPI } = globalRecipeFunctions();

  const handleClick = () => {
    if (window.confirm("Are you sure?????")) {
      clearAPI();
    } else {
      console.log("user clicked cancel");
    }
  };

  return (
    <section className="standard-container">
      <div>
        <h2>DANGER ZONE</h2>
        <div className="spacer-container">
          <button
            className="main-button"
            onClick={() => setDangerButton(!dangerButton)}
          >
            SHOW/HIDE DANGER BUTTON
          </button>
        </div>
        <div className="spacer-container">
          <button
            className="main-button"
            hidden={dangerButton}
            onClick={handleClick}
          >
            DELETE ALL RECIPES
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClearAPIComponent;
