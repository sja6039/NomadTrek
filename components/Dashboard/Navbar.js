import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { logOut } from '@/backend/Auth';
import { useStateContext } from '@/context/StateContext';


const Navbar = () => {
  const { user } = useStateContext();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push('/');
  };

  return (
    <Nav>
      <Logo href = "/">NomadTrek</Logo>
      
      <NavLinks>
        
        <NavLink href = "/" isActive = {router.pathname === '/'}>Dashboard</NavLink>
        <NavLink href = "/gallery" isActive = {router.pathname === '/gallery'}>Gallery</NavLink>
        <NavLink href = "/explore" isActive = {router.pathname === '/explore'}>Explore Parks</NavLink>
        {!user ? (
          <>
            <NavLink href = "/auth/login"isActive = {router.pathname === '/auth/login'}>Login</NavLink>
            <NavLink href = "/auth/signup" isActive = {router.pathname === '/auth/signup'}>Sign Up</NavLink>
          </>
        ) : (
          <NavLink href = "/" onClick={handleLogout}>Log out</NavLink>
        )}

      </NavLinks>

    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3D8D7A;
  padding: 1rem 2rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const Logo = styled(Link)`
  font: 2rem 'Roboto', sans-serif;
  font-size: 2.5rem;
  color: #FBFFE4;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #A3D1C6;
    transform: scale(1.1);
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }

`;

const NavLink = styled(Link)`font: 2rem 'Roboto', sans-serif;
  font-size: 1rem;
  color: #FBFFE4;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: ${props => (props.isActive ? '#A3D1C6' : 'transparent')};
  border: 2px solid ${props => (props.isActive ? '#A3D1C6' : '#fff')};
  transition: all 0.3s ease;

  &:hover {
    background-color: #B3D8A8;
    color: #3D8D7A;
    border-color: #A3D1C6;
  }

  &:active {
    background-color: #A3D1C6;
  }
`;

export default Navbar;
