import React from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch {
      console.log('Error loging out!');
    }
  }

  return (
    <nav className="navigation">
      <Link to="/" className="site-title">
        Your Favorites
      </Link>
      <ul>
        <CustomLink to="/movies">Movies</CustomLink>
        <CustomLink to="/TVShows">TV Shows</CustomLink>
        <Button className="btn btn-dark" onClick={handleLogout}>Log out</Button>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}