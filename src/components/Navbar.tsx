import "../styling/NavbarStyle.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Navbar = () => {

  const navigate = useNavigate();
  
  return (
    <div className="navbar container" >
      <a className='logo'><Link to='/'>Logo</Link></a>
      <div className='nav-links'>
        <a ><Link to='/'>Start</Link></a>
        <a><Link to='/CategoryPage'>Kategorier</Link></a>
        <a><Link to='/Filter'>Filtrera</Link></a>
        <a><Link to='/Recipes'>Alla Recept</Link></a>
        <a><Link to='/AdminPage'>Admin</Link></a>
        <button className="main-btn" onClick={() => navigate('/cart')}>Cart</button>
      </div>

    </div>

  )
}
export default Navbar
