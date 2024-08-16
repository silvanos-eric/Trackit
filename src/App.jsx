import { Link, NavLink, Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import "./App.css";
import { Button, Container, Nav, Navbar } from "./components";

const App = () => {
  const [userList, setUserList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/trackit")
      .then((res) => res.json())
      .then(setUserList);
  }, []);
  const logout = () => {
    setCurrentUserId(null);
    setIsLoggedIn(false);
  };

  const handleCreateUser = (user) => {
    fetch("http://localhost:3000/trackit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) =>
        setUserList((users) => ({
          ...users,
          data,
        }))
      );
  };

  const handleLogin = (id) => {
    setCurrentUserId(id);
    setIsLoggedIn(true);
  };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar expand="lg" className="">
        <Container>
          <Navbar.Brand className="fw-bold fs-1">
            {isLoggedIn && (
              <Link to="/" className="text-decoration-none text-black">
                Trackit.
              </Link>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="d-flex gap-2">
              {!isLoggedIn ? (
                <>
                  <NavLink to="login">
                    <Button variant="outline-secondary">Sign In</Button>
                  </NavLink>
                  <NavLink to="register">
                    <Button variant="dark">Register</Button>
                  </NavLink>
                </>
              ) : (
                <Button variant="secondary" onClick={logout}>
                  Logout
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        className="bg-secondary flex-grow-1"
        style={{ "--bs-bg-opacity": 0.1 }}
      >
        <Outlet
          context={{
            isLoggedIn,
            setIsLoggedIn,
            userList,
            onCreateUser: handleCreateUser,
            onLogin: handleLogin,
          }}
        />
      </div>
    </div>
  );
};

export { App };
