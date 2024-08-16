import { Link, NavLink, Outlet } from "react-router-dom";

import "./App.css";
import { Button, Container, Nav, Navbar } from "./components";

const App = () => (
  <div className="d-flex flex-column h-100">
    <Navbar expand="lg" className="">
      <Container>
        <Navbar.Brand className="fw-bold fs-1">
          <Link to="/" className="text-decoration-none text-black">
            Trackit.
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="d-flex gap-2">
            <NavLink to="login">
              <Button variant="outline-secondary">Sign In</Button>
            </NavLink>
            <NavLink to="register">
              <Button variant="dark">Register</Button>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div
      className="bg-secondary flex-grow-1"
      style={{ "--bs-bg-opacity": 0.1 }}
    >
      <Outlet />
    </div>
  </div>
);

export { App };
