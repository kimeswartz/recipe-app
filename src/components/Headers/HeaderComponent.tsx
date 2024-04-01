import React, { useState } from 'react';
import "../../styling/HeaderComponent.css";
import RecipeSearch from '../SearchRecipe';
import svStrings from '../../interfaces/LanguageSv';
import enStrings from '../../interfaces/LanguageEn';
 

const HeaderComponent: React.FC = () => {

const [language] = useState(navigator.language.startsWith('sv') ? 'sv' : 'en');


const strings = language === 'sv' ? svStrings : enStrings;
  return (
    <header className="home-header">
      <div className="header-content">
        <h1 className="header-title">{strings.header.title}</h1>
        <p className="header-paragraph">{strings.header.paragraph}</p>
        <div className="margin-container">
          <RecipeSearch />
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;