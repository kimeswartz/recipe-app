import React from 'react';
import FilterComponent from '../components/FilterComponent';
import '../styling/Filter.css'; 

const FilterPage = () => {
  return (
    <div className="filter-page">
      <h1>Filter Recipes</h1>
      <div className="filter-component-container">
        <FilterComponent />
      </div>
    </div>
  );
}

export default FilterPage;