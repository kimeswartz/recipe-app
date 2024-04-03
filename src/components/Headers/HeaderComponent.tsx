import "../../styling/HeaderComponent.css";
import RecipeSearch from '../SearchRecipe';

const HeaderComponent = () => {
  return (
    <header className="home-header">
      <div className="header-content">
        <h1 className="header-title">Recept för varje smak!</h1>
        <p className="header-paragraph">Välkommen till Flavor Haven -  Din ultimata destination för att utforska en värld av kulinariska läckerheter! Oavsett om du är en erfaren kock eller nybörjare i köket. Dyk ner i vår skattkammare av rätter och låt äventyret börja!</p>
        <div className="margin-container">
          <RecipeSearch />
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;