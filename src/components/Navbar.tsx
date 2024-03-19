import React from 'react'
import "../styling/NavbarStyle.css"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
   <div className="navbar container" >
      <a className='logo' href='#!'>Logo</a>
      <div className='nav-links'>
      <a><Link to='/'>Home</Link></a>
      <a><Link to='/recipes'>Recipes</Link></a>
      <a><Link to='/search'>Search</Link></a>
      <a><Link to='/'>Admin</Link></a>
      </div>
     
    </div>
  
  )
}
export default Navbar
