import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { Button, Form } from "../components";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { userList, onCreateUser, notifyError } = useOutletContext();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const exists = checkIfUserExists(formData.email);
    if (exists) {
      notifyError("Email already taken. Please try another.");
    } else {
      const user = {
        ...formData,
        balance: 0,
        expenses: [],
      };
      setIsLoading(true);
      onCreateUser(user);
      setIsLoading(false);
      navigate("/login");
    }
  };

  const checkIfUserExists = (email) => {
    const user = userList.find((user) => user.email === email);
    if (user) return true;
    return false;
  };

  return (
    <>
      <main className="container h-100 d-flex flex-column justify-content-center">
        <Form
          onSubmit={handleSubmit}
          style={{ minWidth: 560 }}
          className="mx-auto bg-white p-4 d-flex flex-column gap-4"
        >
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="name"
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="email"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="dark"
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
          <p className="d-flex gap-2">
            Alreay have an account?{" "}
            <Link
              className="text-decoration-none"
              style={{ color: "#FE6D00", border: "none" }}
              to="/login"
            >
              Sign in
            </Link>
          </p>
        </Form>
        <ToastContainer />
      </main>
    </>
  );
};

export { Register };
