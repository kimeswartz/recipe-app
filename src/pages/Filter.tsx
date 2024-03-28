<<<<<<< HEAD
=======

>>>>>>> fd7e73334ba97bea0400f2608c8dbffc56739b23
import FilterComponent from '../components/FilterComponent';
import '../styling/Filter.css'; 

const FilterPage = () => {
  return (
    <div className="filter-page">
      <h1>Filtrera recept</h1>
      <div className="filter-component-container">
        <FilterComponent />
      </div>
    </div>
  );
}

export default FilterPage;