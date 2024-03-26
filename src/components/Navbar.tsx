import "../styling/NavbarStyle.css"
import { Link } from "react-router-dom"
import globalCartFunctions from "../state/Cart"

const Navbar = () => {

  const { displayCart, toggleCart } = globalCartFunctions();

  return (
    <div className="navbar container" >
      <a className='logo'><Link to='/'>Logo</Link></a>
      <div className='nav-links'>
        <a ><Link to='/'>Home</Link></a>
        <a><Link to='/CategoryPage'>Categories</Link></a>
        <a><Link to='/Filter'>Filter</Link></a>
        <a><Link to='/Recipes'>Recipes</Link></a>
        <a><Link to='/AdminPage'>Admin</Link></a>
        <button className="main-btn" onClick={() => toggleCart(displayCart)}>Cart</button>
      </div>
    </div>

  )
}
export default Navbar
