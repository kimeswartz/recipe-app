import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Go To Home Page</Link>
          </li>
          <li>
            <Link to="/recipePage">Go To Recipe Page</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
