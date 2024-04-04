import DisplayOneCocktail from "../components/cocktail_components/DisplayOneCocktail";

const OneCocktailPageContent = () => {
  return (
    <div>
      <h1>This page shows just one cocktail</h1>

      <p>Below you can see the cocktails</p>

      <div className="card">
        <DisplayOneCocktail />
      </div>
    </div>
  );
};

export default OneCocktailPageContent;
