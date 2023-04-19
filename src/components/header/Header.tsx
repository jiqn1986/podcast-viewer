import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="header bg-white">
      <Container>
        <Navbar.Brand href="#home" className="navbar-logo">
          <Link to={'/'} className='text-decoration-none strong'>
            Podcaster
          </Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Spinner animation="grow" variant="primary"/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;