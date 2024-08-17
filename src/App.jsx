import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Container, Nav, Navbar } from "./components";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const API_URL = "https://json-server-vercel-three-pearl.vercel.app/trackit";

const App = () => {
  const [userList, setUserList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setUserList);
  }, []);

  const handleCreateUser = (user) => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => setUserList((users) => [...users, data]))
      .then(() => notifySuccess("Account Created Successfully!"));
  };

  const handleLogin = (id) => {
    setCurrentUserId(id);
    setIsLoggedIn(true);
    notifySuccess("Login Successful");
  };

  const logout = () => {
    navigate("/");
    setIsLoggedIn(false);
    setCurrentUserId(null);
    notifyInfo("Log out successful");
  };

  const notifySuccess = (message) => toast(toast.success(message));

  const notifyError = (message) => toast(toast.error(message));

  const notifyInfo = (message) => toast(toast.info(message));

  const handleUpdateUser = (user) => {
    fetch(`${API_URL}/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((updatedUser) =>
        setUserList((prevUserList) =>
          prevUserList.map((u) => (u.id === user.id ? updatedUser : u))
        )
      )
      .catch(() => notifyError("Failed to update"));
  };

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar expand="lg" className="">
          <Container>
            <Navbar.Brand className="fw-bold fs-1">
              <Link
                to={isLoggedIn ? "/home" : "/"}
                className="text-decoration-none text-black"
              >
                Trackit.
              </Link>
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
              userList,
              currentUserId,
              onCreateUser: handleCreateUser,
              onLogin: handleLogin,
              notifyError,
              notifyInfo,
              notifySuccess,
              onUpdateUser: handleUpdateUser,
            }}
          />
        </div>
      </div>
    </>
  );
};

export { App };
