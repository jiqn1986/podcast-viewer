import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import './Header.css';
import { Link } from 'react-router-dom';
import { LoadingContext } from '../../App';
import React, { useContext, useEffect, useState } from 'react';

function Header() {
  const loading = useContext(LoadingContext).loading;
  const [shouldShowLoading, setShouldShowLoading] = useState(false);

  useEffect(() => {
    setShouldShowLoading(loading);
  }, [loading]);
  return (
    <Navbar bg="light" expand="lg" className="header bg-white">
      <Container>
        <Link to={'/'} className='navbar-logo navbar-brand text-primary text-decoration-none strong'>
          Podcaster
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {shouldShowLoading && (
            <Spinner animation="grow" variant="primary"/>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;