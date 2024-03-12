import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  activeStyle?: any;
}

export const Nav = styled.nav`
  background: #333;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavLink = styled(Link)<NavLinkProps>`
  color: #fff;
  font-size: 1.5rem;
  text-decoration: none;
  margin: 0 1rem;
  cursor: pointer;

  &:hover {
    color: #e5e5e5;
  }

  ${(props) => props.activeStyle && css`
    color: ${props.activeStyle.color};
  `}
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;