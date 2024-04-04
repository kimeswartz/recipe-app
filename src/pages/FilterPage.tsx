import FilterComponent from "../components/recipe_components/FilterComponent";
import "../styling/FilterStyle.css";

const FilterPage = () => {
  return (
    <div className="filter-page">
      <h1>Filtrera recept</h1>
      <div className="filter-component-container">
        <FilterComponent />
      </div>
    </div>
  );
};

export default FilterPage;
