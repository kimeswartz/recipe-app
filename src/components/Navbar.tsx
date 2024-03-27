import "../styling/NavbarStyle.css";
import { To, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  return (
<<<<<<< HEAD
   <div className="navbar container" >
      <a className='logo'><Link to='/'>Logo</Link></a>
      <div className='nav-links'>
      <a><Link to='/'>Home</Link></a>
      <a><Link to='/CategoryPage'>Categories</Link></a>
      <a><Link to='/Filter'>Filter</Link></a>
      <a><Link to='/Recipes'>Recipes</Link></a>
      <a><Link to='/cocktails'>Cocktail</Link></a>
      <a><Link to='/AdminPage'>Admin</Link></a>
=======
    <div className="navbar container">
      <a className="logo" onClick={() => handleNavigation("/")}>
        Logo
      </a>
      <div className="nav-links">
        <a onClick={() => handleNavigation("/")}>Home</a>
        <a onClick={() => handleNavigation("/CategoryPage")}>Categories</a>
        <a onClick={() => handleNavigation("/Filter")}>Filter</a>
        <a onClick={() => handleNavigation("/Recipes")}>Recipes</a>
        <a onClick={() => handleNavigation("/AdminPage")}>Admin</a>
>>>>>>> 24390d7ba0d4fde873a53e5154c49a59cf4677ec
      </div>
    </div>
  );
};

export default Navbar;
