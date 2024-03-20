import React from 'react';
import "../styling/HeaderComponent.css";

const HeaderComponent: React.FC = () => {
  return (
    <header className="home-header">
      <div className="header-content">
        <h1 className="header-title">Det här är vår Home-header component</h1>
        <button className="header-button">Klicka här</button>
      </div>
    </header>
  );
}

export default HeaderComponent;